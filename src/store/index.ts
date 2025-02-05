import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import flightsReducer from './slices/flightsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    flights: flightsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;