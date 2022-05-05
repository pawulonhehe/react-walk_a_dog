import axios from 'axios';

const baseUrl = 'https://backend-wad.herokuap.com/api/';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})



export default axiosInstance;
