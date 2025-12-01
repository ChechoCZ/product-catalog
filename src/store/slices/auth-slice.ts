import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

type AuthState = {
  isAuthenticated: boolean;
  username?: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
