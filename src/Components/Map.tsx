import React, { ReactElement } from "react"
import * as L from 'leaflet'
const geoPoland = require('../geoPoland.json');

interface MapModel { lat: number, lng: number, zoom: number, getPosition: Function }

export const Map = React.memo(class extends React.Component<MapModel> {

    map: any
    marker: any
    lat = 52.237049;
    lng = 21.017532;
    zoom = 8;

    init(): void {
        this.map = L.map('openstreetmap')
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ''
        }).addTo(this.map)
        this.map.on('click', this.handleClick)
    }

    handleClick = (e: any): void => {
        this.removeMarker()
        this.props.getPosition(e.latlng.lat, e.latlng.lng)
    }

    setView(): void {
        const coords = L.latLng(this.lat, this.lng)
        this.map.setView(coords, this.zoom)
    }

    removeMarker(): void {
        if (this.marker)
            this.map.removeLayer(this.marker);
    }

    addMarker(): void {
        const coords = L.latLng(this.lat, this.lng)
        const myIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
        })
        var point = L.point(30, 41);
        this.marker = L.marker(coords, { icon: myIcon, autoPanPadding: point }).addTo(this.map)
    }

    geoPoland() {
        var layer = L.geoJSON(geoPoland)
        this.map.fitBounds(layer.getBounds())
    }

    componentDidMount(): void {
        this.init()
        this.geoPoland()
    }

    componentDidUpdate() {
        this.removeMarker();
        if (this.props.lat > 0 && this.props.lng > 0 && this.props.zoom > 0) {
            this.lat = this.props.lat;
            this.lng = this.props.lng;
            this.zoom = this.props.zoom;
            this.addMarker();
            this.setView();
        }
    }

    render(): ReactElement {
        return (
            <div id="openstreetmap" ></div>
        )
    }
})