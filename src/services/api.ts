import axios from 'axios';
import { Fligth } from '../types/flight.types';

const api = axios.create({
  baseURL: 'https://679d13f487618946e6544ccc.mockapi.io/testove/v1',
});

export const getFlights = () => {
  return api.get<Fligth[]>('/flights').then((response) => response.data);
};

export const getFlightsById = (id: string) => {
  return api.get<Fligth>(`/flights/${id}`).then((response) => response.data);
};