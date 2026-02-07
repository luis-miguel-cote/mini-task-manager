import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, registerRequest } from "../../api/auth.api";

// async actions
export const login = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const res = await loginRequest(credentials);
    return res.data;
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerRequest(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Register error");
    }
  }
);
// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    loginStatus: "idle",
    registerStatus: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginStatus = "idle";
      state.registerStatus = "idle";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })


      // REGISTER
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state) => {
        state.registerStatus = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

