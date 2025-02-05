import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightsState {
  favourites: string[];
}

const initialState: FlightsState = {
  favourites: [],
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const index = state.favourites.indexOf(action.payload);

      if (index === -1) {
        state.favourites.push(action.payload);
      } else {
        state.favourites.splice(index, 1);
      }
    }
  },
});

export const { toggleFavourite } = flightsSlice.actions;
export default flightsSlice.reducer;