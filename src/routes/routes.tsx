import { createBrowserRouter } from 'react-router-dom';
import { FlightsPage } from '../pages/FlightsPage';
import { FlightDetailsPage } from '../pages/FlightDetailsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FlightsPage />,
  },
  {
    path: 'flight/:id',
    element: <FlightDetailsPage />
  }
]);