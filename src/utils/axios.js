import axios from "axios";

const api = axios.create({
  baseURL: "https://netflix-clone-z1iq.onrender.com",
});

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export { api, instance };
