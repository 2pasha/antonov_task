import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart.types';

interface CartState {
  items: CartItem[];
}

interface RemoveFromCartPayload {
  flightId: string;
  seatId: string;
}

const initialState: CartState = {
  items: [],
};

const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return initialState;
  }

  const stored = localStorage.getItem('cart');

  return stored ? JSON.parse(stored) : initialState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<RemoveFromCartPayload>) => {
      state.items = state.items.filter(
        (item) =>
          !(item.flight.id === action.payload.flightId && item.seat.id === action.payload.seatId)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      () => true,
      (state) => {
        localStorage.setItem('cart', JSON.stringify(state));
      }
    );
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
