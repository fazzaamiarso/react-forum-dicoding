import { type RootState } from "@/store";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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

const authSlice = createSlice({
  name: "auth",
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setUser: (state, { payload: { user } }: PayloadAction<{ user: User }>) => {
      state.user = user;
    },
    setToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectCurrentUser = (state: RootState) => state.auth.user;
