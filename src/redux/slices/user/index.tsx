import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILoginForm } from '../../../components/LoginForm/types';
import { IUserSlice } from './types';

export const initialState: IUserSlice = {
  name: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<ILoginForm>) {
      state.name = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export default userSlice.reducer;

export const { addUser } = userSlice.actions;
