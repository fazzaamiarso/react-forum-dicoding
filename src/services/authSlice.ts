import { type RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./api/user";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}
const initialToken = localStorage.getItem("giron-auth-token") ?? null;

const authSlice = createSlice({
  name: "auth",
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialState: { user: null, token: initialToken } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
    });
    builder.addMatcher(userApi.endpoints.getOwnProfile.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectCurrentUser = (state: RootState) => state.auth.user;
