import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: false, pendingPromisesCount: 0 },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
      state.pendingPromisesCount++;
    },
    hideLoading: (state) => {
      const pendingPromises = state.pendingPromisesCount === 0 ? 0 : --state.pendingPromisesCount;
      if (pendingPromises === 0) state.loading = false; // Only hide when there are no pending promises
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
