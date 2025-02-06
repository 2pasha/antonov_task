import { Flight } from '../types/flight.types';
import { Seat } from '../types/seat.types';

const SEATS_PER_ROW = 6;

export const generateSeats = (flight: Flight): Seat[] => {
  const totalRows = Math.ceil(flight.tickets.total / SEATS_PER_ROW);
  const seats: Seat[] = [];
  const occupiedCount = flight.tickets.total - flight.tickets.remaining;

  for (let row = 1; row <= totalRows; row++) {
    const seatsInThisRow = row === totalRows
      ? flight.tickets.total % SEATS_PER_ROW || SEATS_PER_ROW
      : SEATS_PER_ROW

    for (let number = 1; number <= seatsInThisRow; number++) {
      seats.push({
        id: `${row}-${number}`,
        row,
        number,
        status: 'free',
      })
    }
  }

  const randomIndxes = new Set<number>();

  while(randomIndxes.size < occupiedCount) {
    randomIndxes.add(Math.floor(Math.random() * seats.length));
  }

  randomIndxes.forEach(index => {
    seats[index].status = 'occupied';
  });

  return seats;
}