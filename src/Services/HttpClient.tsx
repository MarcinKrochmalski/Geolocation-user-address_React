
import { Observable } from 'rxjs'
import { AddressModel } from '../Models/Address.model'

export class HttpClient {
    getAddressInfo = (address: AddressModel[]): Observable<{}> => {
        return new Observable(sub => {
            fetch(`https://capap.gugik.gov.pl/api/fts/hier/pkt/qq?cnt=1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
            })
                .then(response => response.json())
                .then(data => {
                    sub.next(data)
                    sub.complete()
                })
                .catch(error => {
                    console.error(error)
                })
        })
    }
    getPosition(lat: number, lng: number): Observable<{}> {
        return new Observable(sub => {
            fetch(`https://capap.gugik.gov.pl/api/fts/rgc/adr?x=${lng}&y=${lat}&d=20000`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    sub.next(data)
                    sub.complete()
                })
                .catch(error => {
                    console.error(error)
                })
        })
    }
}