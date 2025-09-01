// redux/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: UserType | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Save user info and token after login
    setCredentials: (state, action: PayloadAction<{ user: UserType; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Logout user
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth"); // optional: remove persisted data
    },

    // Hydrate auth state from localStorage on app load
    hydrateAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials, logout, hydrateAuth } = authSlice.actions;

export default authSlice.reducer;
