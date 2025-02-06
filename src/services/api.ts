import axios from 'axios';
import { Flight } from '../types/flight.types';

const api = axios.create({
  baseURL: 'https://679d13f487618946e6544ccc.mockapi.io/testove/v1',
});

export const getFlights = () => {
  return api.get<Flight[]>('/flights').then((response) => response.data);
};

export const getFlightsById = (id: string) => {
  return api.get<Flight>(`/flights/${id}`).then((response) => response.data);
};