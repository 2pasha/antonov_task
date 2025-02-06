import { Flight } from './flight.types';
import { Seat } from './seat.types';

export interface CartItem {
  flight: Flight;
  seat: Seat;
}