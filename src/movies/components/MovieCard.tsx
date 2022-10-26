import { StarRating, Button } from 'shared/components';

import { getAvgRating } from 'movies/ratings';
import { Movie } from 'types';
import { useMovies } from './MovieProvider';



interface MovieCardProps {
    movie: Movie,
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const { moviesDispatch } = useMovies();

    // TODO: implement required functionality

    return (
        <div data-testid={`movie-item-${movie.id}`}>
            <img src={movie.imageUrl} className="card-img-top" alt="" />
            <div className="card-body">
                <h4 className="card-title">
                    {movie.title}
                </h4>
                <h6 className="card-subtitle mb-2 text-muted">{movie.subtitle}</h6>
                <p className="text-justify" style={{ fontSize: '14px' }}>
                    {movie.description}
                </p>
                {/* TODO: Implement delete functionality */}
                <Button onClick={() => {
                    moviesDispatch({
                        type: 'delete',
                        payload: {
                            movieId:movie.id
                        }
                    })
                }}>Delete</Button>
            </div>
            <div className="card-footer">
                <div className="clearfix">
                <div className="float-left mt-1">
                    <StarRating rating={getAvgRating(movie)} onRate={(rating) => {
                        moviesDispatch({
                            type: 'rate',
                            payload: {
                                movieId: movie.id,
                                rating
                            }
                        })
                    }}/> 
                </div>
                {/* TODO: Display rating value */}
                <div data-testid="movie-rating" className="card-footer-badge float-right badge badge-primary badge-pill">{getAvgRating(movie)}</div>
                </div>
            </div>
        </div>    
    )
};
