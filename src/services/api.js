import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;

//https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/11?api_key=b5805910d0d74fb5089f5474768e234c'