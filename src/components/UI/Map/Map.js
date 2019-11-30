import React, { useEffect, useState } from 'react';
import MapImage from '../../../assets/images/map.png';
import classes from './Map.module.css';
import apiKey from '../../../shared/GoogleApiKey';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

const MapContainer = (props) => {

    const [location, setLocation] = useState(null);
    console.log(location);

    const fetchGeoCoding = address => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}&language=en`).then(
            result => {
                setLocation({
                    longitude: result.data.results[0].geometry.location.lng,
                    latitude: result.data.results[0].geometry.location.lat
                });
            }
        ).catch(err => console.log(err));
    }


    useEffect(() => {
        fetchGeoCoding(props.address);
    }, [props.address])

    const mapStyles = {
        borderRadius: '15px',
        height: '250px',
        width: '300px',
        display: 'block',
        clear:'both'
    };

    return location ? <Map
        google={props.google}
        zoom={11.5}
        style={mapStyles}
        initialCenter={{ lat: location.latitude, lng: location.longitude }}
        mapTypeControl={false}
        streetViewControl={false}
    /> : <p>Loading...</p>
}
export default GoogleApiWrapper({
    apiKey: apiKey
})(MapContainer);