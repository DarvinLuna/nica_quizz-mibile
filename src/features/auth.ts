import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import makeApiCall from '../http';
import { HOST } from '../constants/settings';
import { NicaQuizz as Types } from '../types/interfaces';

const initialState: Types.AuthState = {
  access: null,
  refresh: null,
  isLoading: false,
  errors: {},
};

export const login = createAsyncThunk<
  Types.LoginResponse,
  Types.LoginPayload,
  Types.ErrorResponse
>('auth/login', async (payload, { rejectWithValue }) => {
  const url = HOST.concat('/auth/token/');
  return makeApiCall(url, 'POST', payload, rejectWithValue);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.access = null;
      state.refresh = null;
      state.isLoading = false;
      state.errors = {};
    },
    refresh(state, action: PayloadAction<Types.LoginResponse>) {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    clearErrors(state) {
      state.errors = {};
    },
    clearError(state, action: PayloadAction<{ key: string }>) {
      if (state.errors) {
        delete state.errors[action.payload.key];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.access = null;
        state.refresh = null;
        state.errors = action.payload ?? {};
      });
  },
});

export const { logout, refresh } = authSlice.actions;
export default authSlice.reducer;
