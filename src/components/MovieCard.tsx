import { useNavigate } from 'react-router-dom';

import { MovieList } from '../interface/movie';

export const MovieCard = ({ movie }: { movie: MovieList }) => {
  const navigate = useNavigate();

  return (
    <div
      className='p-4 border-2 rounded-md border-black-90 cursor-pointer mb-8 md:mb-16'
      onClick={() => navigate(`movie/${movie.id}`)}
    >
      <h3 className='w-[150px] black-90 pb-4 font-semibold'>{movie.title}</h3>
      <img
        src={`${process.env.REACT_APP_BASE_IMAGE_PATH}/${movie.poster_path}`}
        alt={movie.title}
        width={150}
        height={225}
      />
    </div>
  );
};
