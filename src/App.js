import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "./Components/Row";
import requests from "./requests";
import Banner from "./Components/Banner";
import Nav from "./Components/Nav";
import MovieList from "./Components/MovieList";
import addFav from "./Components/addFav";
import FavList from "./Components/FavList";
import RemoveFav from "./Components/removeFav";

function App() {
  const [favourites, setFavourites] = useState([]);

  const addFavouriteMovie = (movie) => {
    let x = 0;
    favourites.forEach((fav) => {
      let id = fav.imdbID;
      if (id === movie.imdbID) {
        x = 1;
      }
    });
    if (x === 0) {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  };

  const RemoveFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("flixnet-favourites", JSON.stringify(items));
  };

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("flixnet-favourites")
    );
    setFavourites(movieFavourites);
  }, []);

  return (
    <div className="app">
      <Nav></Nav>
      <Banner></Banner>
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <MovieList
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={addFav}
      />
      <FavList
        movies={favourites}
        handleFavouritesClick={RemoveFavouriteMovie}
        favouriteComponent={RemoveFav}
      />
    </div>
  );
}

export default App;
