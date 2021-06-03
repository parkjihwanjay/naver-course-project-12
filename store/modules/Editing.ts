import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'typesafe-actions';

type IEditingState = string | null;

const reducers: CreateSliceOptions['reducers'] = {
  setEditingState: (state: IEditingState, action: PayloadAction<string>) => {
    return action.payload;
  },
};

const editingSlice = createSlice({
  name: 'editing',
  initialState: null,
  reducers,
});

const { setEditingState } = editingSlice.actions;

export const setEditingStateAction = (payload: string): Action => setEditingState(payload);

export default editingSlice.reducer;
