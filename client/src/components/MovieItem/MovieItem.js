import React, { useState, useEffect } from 'react';
import keys from '../../config/keys'
import './MovieItem.css'

export default function MovieItem(props) {
    const [movie, setMovie] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    function fetchMovieById() {
        const movieId = props.match.params.id;
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${keys.apiKey}&language=en-US`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => {
            data.year = Number(data.release_date.split('-', 1)[0]);
            setMovie(data);
            setIsLoading(false);
            console.log(data)
        })
    }

    useEffect(() => {
        fetchMovieById();
    }, []);

    return (
        <div className="MovieItem">
            {!isLoading ? (
                <>
                    <div className="movie-header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})` }}>
                        <div className="inner-movie-header">
                            <div className="poster">
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                            </div>
                            <div>
                                <h1>{movie.title} ({movie.year})</h1>
                                <p>{movie.release_date} (US)</p>
                                {
                                    movie.genres.map(function(genre, index) {
                                        return <span key={genre.id}>{ (index ? ', ' : '') + genre.name }</span>;
                                    })
                                }
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="reviews">
                        <h2>Reviews</h2>
                    </div>
                </>
            ) : (
                <p>loading movie..</p>
            )}
        </div>
    )
}