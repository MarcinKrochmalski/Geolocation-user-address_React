import React from 'react'
import './App.css'
import { Info } from './Components/Info'
import { MyForm } from './Components/MyForm'
import { Map } from './Components/Map'
import { HttpClient } from './Services/HttpClient'
import { Subscription } from 'rxjs'
import { AddressModel } from './Models/Address.model'

class App extends React.Component {

	constructor(props: any, private subscription: Subscription) {
		super(props)
	}

	httpClient = new HttpClient()
	state = {
		lat: 0,
		lng: 0,
		zoom: 0,
		info: '',
		addressIsCorrect: false
	}
	apiAddress: any = {}

	setCoordination = (lat: number, lng: number, zoom: number) => {
		this.setState({
			lat,
			lng,
			zoom
		})
	}

	handleInfo = (info: string) => {
		this.setState({
			info
		})
	}

	getPosition = (lat: number, lng: number): void => {
		this.unsubscribe()
		this.subscription = this.httpClient.getPosition(lat, lng).subscribe(
			(res: any) => {
				if (res.single) {
					this.initApiAddress(res.single)
					this.setCoordination(res.single.geometry.coordinates[1], res.single.geometry.coordinates[0], 18)
					this.setState({ addressIsCorrect: true })
				}
			}
		)
	}

	initApiAddress = (address: any): void => {
		this.apiAddress = {
			woj: address?.woj_nazwa,
			pow: address?.pow_nazwa,
			gmi: address?.gm_nazwa,
			msc: address?.miejsc_nazwa,
			kod: address?.pkt_kodPocztowy,
			ulc: address?.ul_nazwa_glowna,
			nr: address?.sort1
		}
	}

	getAddressInfo = (address: AddressModel[]): void => {
		this.unsubscribe()
		this.subscription = this.httpClient.getAddressInfo(address).subscribe(
			(res: any) => {
				this.handleAddressInfo(res, address);
			}
		)
	}

	handleAddressInfo = (addressInfo: any, address: AddressModel[]): void => {
		if ('features' in addressInfo && addressInfo.features.length > 0) {
			let zoom = 6 + (address.length * 2)
			this.setCoordination(addressInfo.features[0].geometry.coordinates[1], addressInfo.features[0].geometry.coordinates[0], zoom)
			this.handleInfo('')
			this.setState({ addressIsCorrect: true })
		} else {
			this.handleErrorsAddress(address)
			this.handleInfo('Adres jest nieprawidłowy')
			this.setState({ addressIsCorrect: false })
		}
	}

	handleErrorsAddress = (address: AddressModel[]): void => {
		address.forEach(field => {
			this.apiAddress[field.level] = 'error';
		})
	}

	getApiAddress = (): {} => {
		return this.apiAddress
	}

	unsubscribe() {
		if (this.subscription.unsubscribe)
			this.subscription.unsubscribe()

	}

	componentDidUpdate() {
		this.apiAddress = {}
	}

	componentWillUnmount() {
		this.unsubscribe()
	}

	render() {
		return (
			<>
				<Info
					info={this.state.info}
					handleInfo={this.handleInfo}
				/>
				<div className="row main">
					<div className="col s6 scroll">
						<div className="row">
							<h6> Wypełnij formularz lub wskaż miejsce na mapie. </h6>
						</div>
						<MyForm
							addressIsCorrect={this.state.addressIsCorrect}
							getApiAddress={this.getApiAddress}
							getAddressInfo={this.getAddressInfo}
							handleInfo={this.handleInfo}
						/>
					</div>
					<div className="col s6">
						<Map
							lat={this.state.lat}
							lng={this.state.lng}
							zoom={this.state.zoom}
							getPosition={this.getPosition}
						/>
					</div>
				</div>
			</>
		)
	}
}

export default App
