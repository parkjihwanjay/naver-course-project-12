/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'typesafe-actions';

export interface IEditingState {
  columnId: string;
  cardId: string;
}

const reducers: CreateSliceOptions['reducers'] = {
  setListEditingState: (state: IEditingState, action: PayloadAction<string>) => {
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

const { setListEditingState, setCardEditingState } = editingSlice.actions;

export const setListEditingStateAction = (payload: string): Action => setListEditingState(payload);
export const setCardEditingStateAction = (cardId: string): Action => setCardEditingState(cardId);

export default editingSlice.reducer;
