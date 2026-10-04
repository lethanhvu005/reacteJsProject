import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/laravel8/public/api/",
});

export default API;
