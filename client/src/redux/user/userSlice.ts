import { createSlice } from '@reduxjs/toolkit';
import { Nullable } from '../../models/common/Types';
import { User } from '../../models/user/User.model';

export interface UserState {
  currentUser: Nullable<User>;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginLoading: (state) => {
      state.loading = true;
      state.currentUser = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = '';
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
    updateUserLoading: (state) => {
      state.loading = true;
    },
    updateUserFetched: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = '';
    },
    updateUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { loginLoading, loginSuccess, loginFailure, loginError, updateUserError, updateUserFetched, updateUserLoading } =
  userSlice.actions;

export default userSlice.reducer;
