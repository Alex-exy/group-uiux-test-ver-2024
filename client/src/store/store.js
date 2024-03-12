// In src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import rideReducer from './rideSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ride: rideReducer,
  },
});

