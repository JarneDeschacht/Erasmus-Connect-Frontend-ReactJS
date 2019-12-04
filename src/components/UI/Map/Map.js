import React, { useEffect, useState } from 'react';
import classes from './Map.module.css';
import apiKey from '../../../shared/GoogleApiKey';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

const MapContainer = (props) => {

    const [location, setLocation] = useState(null);

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
        height: '15rem',
        width: '20rem',
        display: 'block',
    };

    return location ? <div className={classes.Map}>
        <Map
            google={props.google}
            zoom={11.5}
            style={mapStyles}
            initialCenter={{ lat: location.latitude, lng: location.longitude }}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
        />
    </div> : <p>Loading...</p>
}
export default GoogleApiWrapper({
    apiKey: apiKey
})(MapContainer);