import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { MovieDetailsInfo } from '../interface/movie';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

export const MovieDetails = () => {
  const [movie, setMovie] = useState<MovieDetailsInfo>();
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_DATA_PATH}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
      );

      const data = await res.json();
      data.favorite = false;

      const favoriteMovies = getFromStorage('favoriteMovies');
      const findFavorite = favoriteMovies.find((favoriteMovie: MovieDetailsInfo) => favoriteMovie.id === data.id);
      if (findFavorite) data.favorite = true;
      setMovie(data);
    };

    fetchData().catch(console.error);
  }, [movieId]);

  const saveMovie = () => {
    if (!movie) return;
    const favoriteMovies = getFromStorage('favoriteMovies') || [];

    if (movie.favorite) {
      const newArray = favoriteMovies.filter((favoriteMovie: MovieDetailsInfo) => favoriteMovie.id !== movie.id);
      saveToStorage('favoriteMovies', newArray);
      setMovie({ ...movie, favorite: false });

      return;
    }

    favoriteMovies.push({ ...movie, favorite: true });
    setMovie({ ...movie, favorite: true });

    saveToStorage('favoriteMovies', favoriteMovies);
  };

  return (
    <div className='flex min-h-screen justify-center'>
      {movie ? (
        <div className='container p-8 md:p-0 md:md'>
          <div className='py-8 md:py-14'>
            <h1 className='font-archivo text-3xl'>{movie.title}</h1>
          </div>

          <div className='md:flex md:flex-row md:gap-10'>
            <img
              className='mb-10 md:mb-0'
              src={`${process.env.REACT_APP_BASE_IMAGE_PATH}/${movie.poster_path}`}
              alt={movie.title}
              width={150}
              height={225}
            />

            <div>
              <div className='flex gap-2 mb-4'>
                <h4 className='font-semibold'>Description:</h4>
                <p>{movie.overview}</p>
              </div>
              <div className='flex gap-2 mb-4'>
                <h4 className='font-semibold'>Genres:</h4>
                <div>
                  {movie.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </div>
              </div>

              <div className='flex gap-2 mb-4'>
                <h4 className='font-semibold'>Release date:</h4>
                <p>{movie.release_date}</p>
              </div>
              <button
                onClick={() => {
                  saveMovie();
                }}
                className='py-1 px-2 font-semibold border rounded-xl border-black-90 hover:bg-amaranth'
              >
                {movie.favorite ? 'Remove from favorite' : 'Add to favorite'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
