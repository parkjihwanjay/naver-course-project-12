/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'typesafe-actions';

export interface IUserState {
  email: string;
  jwtToken: string;
}

const reducers: CreateSliceOptions['reducers'] = {
  setJwtToken: (state: IUserState, action: PayloadAction<string>) => {
    state.jwtToken = action.payload;
  },
  setEmail: (state: IUserState, action: PayloadAction<string>) => {
    state.email = action.payload;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    jwtToken: null,
  },
  reducers,
});

const { setJwtToken, setEmail } = userSlice.actions;

export const setJwtTokenAction = (payload: string): Action => setJwtToken(payload);

export default userSlice.reducer;
