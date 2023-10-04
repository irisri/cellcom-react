import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/globals.css';

import { MainScreen } from './pages/MainScreen';
import { MovieDetails } from './pages/MovieDetails';
// import { UserProfile } from './pages/userProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainScreen />,
  },
  {
    path: '/movie/:movieId',
    element: <MovieDetails />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
