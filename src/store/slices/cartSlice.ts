import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fligth } from '../../types/flight.types';
import { Seat } from '../../types/seat.types';

interface CardItem {
  flight: Fligth;
  seat: Seat;
}

interface CartState {
  items: CardItem[];
}

interface RemoveFromCartPayload {
  flightId: string;
  seatId: string;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CardItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      state.items = state.items.filter(item => 
        !(item.flight.id === action.payload.flightId &&
          item.seat.id === action.payload.seatId)
      );
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;