import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alers',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state, action) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
