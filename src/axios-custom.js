import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://esn-partner.firebaseio.com/'
});

export default instance;