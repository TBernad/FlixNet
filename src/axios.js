import axios from "axios";

//check postman to see the GET
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
