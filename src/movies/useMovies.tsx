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
        const mId = action.payload.movieId;
        let indexToRemove = -1;
        for(let i = 0 ; i<state.movies.length;i++ ){
          const movie = state.movies[i];
          if(movie.id === mId){
            indexToRemove = i;
          }
        }
        if(indexToRemove !== -1)
          state.movies.splice(indexToRemove,1);
        return { movies:[...state.movies],initialized:true};

      case "rate":
        const rating = action.payload.rating;
        const movieId = action.payload.movieId;
        for(let i = 0 ; i<state.movies.length;i++ ){
          const movie = state.movies[i];
          if(movie.id === movieId){
            movie.ratings.push(rating);
          }
        }
        return { movies:[...state.movies],initialized:true};

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
