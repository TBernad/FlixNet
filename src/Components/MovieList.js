import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieListHeading from "./MovieListHeading";
import "./Row.css";
import SearchBox from "./SearchBox";
import InfoComponent from "./Info";

function MovieList(props) {
  const [movies, setMovies] = useState([
    {
      Title: "Alien",
      Year: "1979",
      imdbID: "tt0078748",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMmQ2MmU3NzktZjAxOC00ZDZhLTk4YzEtMDMyMzcxY2IwMDAyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      Title: "Gladiator",
      Year: "2000",
      imdbID: "tt0172495",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Year: "2001",
      imdbID: "tt0120737",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    },
    {
      Title: "Hacksaw Ridge",
      Year: "2016",
      imdbID: "tt2119532",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX300.jpg",
    },
    {
      Title: "A Quiet Place Part II",
      Year: "2020",
      imdbID: "tt8332922",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTE2ODU4NDEtNmRjNS00OTk1LTg4NmMtNTAzYzVlNzJmYjgzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
    {
      Title: "The Godfather",
      Year: "1972",
      imdbID: "tt0068646",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      Title: "Pulp Fiction",
      Year: "1994",
      imdbID: "tt0110912",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      Title: "The Dark Knight",
      Year: "2008",
      imdbID: "tt0468569",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [infosArray, setInfoArray] = useState([]);
  const FavouriteComponent = props.favouriteComponent;

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=fe790038`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const getInfoMovie = async (movie) => {
    const url = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=fe790038`;
    const response = await fetch(url);
    const responseJson = await response.json();
    const MovieInfos = Object.values(responseJson);
    console.log(MovieInfos);
    if (MovieInfos) {
      setInfoArray(MovieInfos);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return [
    <div>
      <div className="row d-flex align-items-center mt-4 mb-2">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <div className="row_posters">
          {movies.map((movie, index) => (
            <div className="row_posterList">
              <img
                className=""
                src={movie.Poster} //movies[13]
                alt={movie.Title} //movies[0]
              ></img>
              <div
                onClick={() => getInfoMovie(movie)}
                className="info-overlay d-flex align-items-center justify-content-center"
              >
                <InfoComponent />
              </div>
              <div
                onClick={() => props.handleFavouritesClick(movie)}
                className="overlay d-flex align-items-center justify-content-center"
              >
                <FavouriteComponent />
              </div>
            </div>
          ))}
        </div>
      </div>
      <details>
        <summary>
          <h1 className="details-title">Details</h1>
        </summary>
        <ul>
          <li>Title : {infosArray[0]}</li>
          <li>Year : {infosArray[1]}</li>
          <li>Runtime : {infosArray[4]}</li>
          <li>Director: {infosArray[6]}</li>
          <li>Imdb Rating : {infosArray[16]}</li>
          <li>Awards : {infosArray[12]}</li>
          <li>Plot : {infosArray[9]}</li>
        </ul>
      </details>
    </div>,
  ];
}

export default MovieList;
