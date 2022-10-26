import React, { useReducer, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { Movie, MoviesAction } from "types";
import { getMovies } from "api/movies";

interface MoviesState {
  movies: Movie[];
  initialized: boolean;
}

export function useMoviesCollection(): [
  MoviesState,
  React.Dispatch<MoviesAction>
] {
  // TODO: Implement all action processing

  const movieReducer = (
    state: MoviesState,
    action: MoviesAction
  ): MoviesState => {
    switch (action.type) {
      case "fetch":
        return { movies: action.payload.data, initialized: true };
      case "add":
        const movie = action.payload.movie;
        const movies = state.movies;
        const m:Movie = {
          ...movie,
          id:uuid(),
          ratings:[0,0,0,0,0]
        }
        return { movies: [...movies,m], initialized: true };

      case "delete":
        const id = action.payload.movieId;
        for(let i in state.movies ){
          
        }
        return { ...state };

      case "rate":
        return { ...state };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  useEffect(() => {
    getMovies().then((movies) => {
      dispatch({
        type: "fetch",
        payload: {
          data: movies,
        },
      });
    });
  }, []);

  return [state, dispatch];
}
