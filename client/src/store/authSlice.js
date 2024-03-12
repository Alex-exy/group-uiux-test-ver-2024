// In src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, // Add this line to hold the userId
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => { // Add a reducer to set the userId
      state.userId = action.payload;
    },
  },
});

export const { setAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer;
