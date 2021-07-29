import React from "react";
import "./MovieList.css";
import MovieListHeading from "./MovieListHeading";
import "./Row.css";

function FavList(props) {
  const FavouriteComponent = props.favouriteComponent;

  return [
    <div>
      <div className="row d-flex align-items-center mt-4 mb-2">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <div className="row_posters">
          {props.movies.map((movie, index) => (
            <div className="row_posterList image-container justify-content-start m-3">
              <img
                className=""
                src={movie.Poster} //movies[13]
                alt={movie.Title} //movies[0]
              ></img>
              <div
                onClick={() => props.handleFavouritesClick(movie)}
                className="overlay d-flex align-items-center justify-content-center"
              >
                <FavouriteComponent />
              </div>
            </div>
          ))}
        </div>
        <div className="pb-5"></div>
      </div>
    </div>,
  ];
}

export default FavList;
