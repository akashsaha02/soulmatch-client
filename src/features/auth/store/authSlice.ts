import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  role: string;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.role = "";
    },
  },
});

export const { setUser, setLoading, setRole, logout } = authSlice.actions;
export default authSlice.reducer;
