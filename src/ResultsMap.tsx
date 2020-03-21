import React, {FC, useState, useEffect} from 'react'
import {GoogleMap, Polyline, withGoogleMap} from 'react-google-maps';
import { FaSpinner } from "react-icons/fa"

type LatLngLiteral = {
    lat: Number,
    lng: Number
}

const MapContainer : FC<{encodedPolyline: string}> = (props) =>{

    const [decodedPolyline, setDecodedPolyline] =  useState<Array<LatLngLiteral> | undefined>(undefined);
    const [centre, setCentre] =  useState<LatLngLiteral>({ lat: 3.85, lng:-12.02 });
    const [zoom, setZoom] = useState<number | undefined>(undefined)

    const decodePolyline = (): Array<LatLngLiteral> => {
        let polyline = require('@mapbox/polyline')

        const decodedPolyline: Array<Array<Number>> = polyline.decode(props.encodedPolyline, 6);
        const asLatLngLiteral: Array<LatLngLiteral> = decodedPolyline.map(a => ({ lat: a[0], lng: a[1]}))

        return asLatLngLiteral  
    }
    const defaultCenter = { lat: 40.418282, lng:-3.702435 }
    const googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp' ;
    const loadingElement = <div><FaSpinner /></div>
    const GoogleMapExample: any = withGoogleMap(props => (
        <GoogleMap
            defaultCenter = {defaultCenter}
            defaultZoom = { 6 }
            center = {centre ? centre : defaultCenter}
            zoom = {zoom ? zoom : 6}
            >
                {decodedPolyline &&
                <Polyline path={decodedPolyline}  
                />}
        </GoogleMap>
     )
    ); 
   
    useEffect(() => {

        const result: Array<LatLngLiteral> = decodePolyline();
        console.log('result of passing coords to latlngliterals is: ' + result);

        const centre: LatLngLiteral = result[0]
        const routeZoom: number = 12

        setDecodedPolyline(result);
        setCentre(centre);
        setZoom(routeZoom)
    }, []);

    return(
        <div className="row">
            <GoogleMapExample
                loadingElement= {loadingElement}
                googleMapURL = {googleMapURL}
                containerElement={ <div style={{ height: `600px`, width: '1920px' }} /> }
                mapElement={ 
                    <div style={{ height: `100%`, width: `100%`, margin: `0`, padding: `0` }} />
                }
            />
        </div>
    );   
}
export default MapContainer;