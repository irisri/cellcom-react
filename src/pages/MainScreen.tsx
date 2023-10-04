import React, { useEffect, useState } from 'react';

import { MovieList, Filter } from '../interface/movie';
import { MovieCard } from '../components/MovieCard';

import { getFromStorage } from '../utils/localStorage';

export const MainScreen = () => {
  const [movies, setMovies] = useState<MovieList[]>([]);
  const [filter, setFilter] = useState(Filter.Popular);

  useEffect(() => {
    const fetchData = async () => {
      let url = `${process.env.REACT_APP_DATA_PATH}/movie`;

      switch (filter) {
        case Filter.Now_Playing:
          url += '/now_playing';
          break;
        default:
          url += `/popular`;
      }

      const res = await fetch(`${url}?api_key=${process.env.REACT_APP_API_KEY}`);

      const data = await res.json();
      setMovies(data.results);
    };

    if (filter === Filter.Favorite_Movies) {
      const favoriteMovies = getFromStorage('favoriteMovies');
      setMovies(favoriteMovies || []);
      return;
    }

    fetchData().catch(console.error);
  }, [filter]);

  const setStyle = (value: Filter) => {
    const baseStyle = 'py-1 px-2 font-semibold border rounded-xl border-black-90';
    if (value === filter) return `${baseStyle} filter-selected`;
    return baseStyle;
  };

  return (
    <div className='flex min-h-screen justify-center'>
      <div className='md:container p-8'>
        <div className='py-8 md:py-14'>
          <h1 className='font-extrabold	font-archivo text-3xl text-center md:text-left'>Movies</h1>
          <div className='mt-8 flex gap-10 md:mt-4'>
            <button
              className={setStyle(Filter.Popular)}
              onClick={() => {
                setFilter(Filter.Popular);
              }}
            >
              Popular
            </button>
            <button
              className={setStyle(Filter.Now_Playing)}
              onClick={() => {
                setFilter(Filter.Now_Playing);
              }}
            >
              Now Playing
            </button>
            <button
              className={setStyle(Filter.Favorite_Movies)}
              onClick={() => {
                setFilter(Filter.Favorite_Movies);
              }}
            >
              Favorite Movies
            </button>
          </div>
        </div>

        <div className='flex flex-wrap justify-center md:justify-between md:mb-16'>
          {movies && movies.length > 0 ? (
            movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })
          ) : (
            <p>Sorry no movies here</p>
          )}
        </div>
      </div>
    </div>
  );
};
