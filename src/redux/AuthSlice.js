import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loggedInUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loggedInUser = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;