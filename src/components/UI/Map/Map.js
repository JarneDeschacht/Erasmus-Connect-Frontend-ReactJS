import React, { useEffect, useState } from 'react';
import classes from './Map.module.css';
import apiKey from '../../../shared/GoogleApiKey';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const MapContainer = (props) => {

    const [location, setLocation] = useState(null);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mapStyles = {
        borderRadius: '15px',
        height: '11rem',
        width: '16rem',
        display: 'block',
    };

    if (windowDimensions.width >= 576) {
        if (windowDimensions.width >= 992) {
            if (windowDimensions.width >= 1200) {
                mapStyles.height = '15rem';
                mapStyles.width = '20rem';
            } else {
                mapStyles.height = '8rem';
                mapStyles.width = '12rem';
            }
        }
        else {
            mapStyles.height = '15rem';
            mapStyles.width = '20rem';
        }
    }



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