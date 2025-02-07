import { createHashRouter } from 'react-router-dom';
import { FlightsPage } from '../pages/FlightsPage';
import { FlightDetailsPage } from '../pages/FlightDetailsPage';
import { CartPage } from '../pages/CartPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <FlightsPage />,
    errorElement: <div>Error flight page</div>
  },
  {
    path: '/flight/:id',
    element: <FlightDetailsPage />,
    errorElement: <div>Error flight details</div>

  },
  {
    path: '/cart',
    element: <CartPage />,
    errorElement: <div>Error loading cart</div>
  }
]);