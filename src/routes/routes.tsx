import { createHashRouter } from 'react-router-dom';
import { FlightsPage } from '../pages/FlightsPage';
import { FlightDetailsPage } from '../pages/FlightDetailsPage';
import { CartPage } from '../pages/CartPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <FlightsPage />,
  },
  {
    path: '/flight/:id',
    element: <FlightDetailsPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  }
]);