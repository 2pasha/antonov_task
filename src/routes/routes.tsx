import { createBrowserRouter } from 'react-router-dom';
import { FlightsPage } from '../pages/FlightsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FlightsPage />,
  }
]);