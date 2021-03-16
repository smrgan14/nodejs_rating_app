import axios from 'axios';

/*
Change baseURL to suit your project needs.
*/
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
});

export default http;
