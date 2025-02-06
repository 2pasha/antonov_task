export type SeatStatus = 'free' | 'occupied' | 'selected';

export interface Seat {
  id: string;
  row: number;
  number: number;
  status: SeatStatus;
}