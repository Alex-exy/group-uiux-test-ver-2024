// In src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const rideSlice = createSlice({
  name: 'ride',
  initialState: {
    selectedRide: {}, // Add this line to hold the userId
  },
  reducers: {
    setSelectedRide: (state, action) => {
      state.selectedRide = action.payload;
    },
  },
});

export const { setSelectedRide } = rideSlice.actions;

export default rideSlice.reducer;

