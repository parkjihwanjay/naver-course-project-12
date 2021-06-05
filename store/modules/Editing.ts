/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'typesafe-actions';

interface IEditingState {
  columnId: string;
  cardId: string;
}

const reducers: CreateSliceOptions['reducers'] = {
  setColumnEditingState: (state: IEditingState, action: PayloadAction<string>) => {
    state.columnId = action.payload;
  },
  setCardEditingState: (state: IEditingState, action: PayloadAction<string>) => {
    state.cardId = action.payload;
  },
};

const editingSlice = createSlice({
  name: 'editing',
  initialState: {
    columnId: null,
    cardId: null,
  },
  reducers,
});

const { setColumnEditingState, setCardEditingState } = editingSlice.actions;

export const setColumnEditingStateAction = (payload: string): Action => setColumnEditingState(payload);
export const setCardEditingStateAction = (payload: string): Action => setCardEditingState(payload);

export default editingSlice.reducer;
