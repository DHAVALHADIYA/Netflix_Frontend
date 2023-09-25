import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export { api, instance };
