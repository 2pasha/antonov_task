import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightsState {
  favorites: string[];
}

const initialState: FlightsState = {
  favorites: [],
};

const loadFavoritesFromStorage = (): FlightsState => {
  if (typeof window === 'undefined') {
    return initialState;
  }

  const stored = localStorage.getItem('favorites');

  return stored ? JSON.parse(stored) : initialState;
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState: loadFavoritesFromStorage(),
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);

      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    }
  },
});

export const { toggleFavorite: toggleFavorite } = flightsSlice.actions;
export default flightsSlice.reducer;