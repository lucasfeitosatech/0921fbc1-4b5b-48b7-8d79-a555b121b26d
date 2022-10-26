import React, { useState } from 'react';

import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';

import { useMovies } from './MovieProvider';

type NewMovieMode = "BUTTON" | "FORM"

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState('button');

  // TODO: Display list of movies
  
  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>      
      ))}
      <Card>
        {displayOptionType === 'button' ? <AddMovieButton onClick={() => setDisplayOptionType('form')}/> : <AddMovieForm onSubmit={(movie) => {
          console.log('add');
          moviesDispatch({
            type: 'add',
            payload: {
                movie
            }
        })
        setDisplayOptionType('button')
        }} onCancel={() => setDisplayOptionType('button')}/> }
        {/* TODO: use AddMovieButton and AddMovieForm */}
      </Card>
    </div>
  );
}
