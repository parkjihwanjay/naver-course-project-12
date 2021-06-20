/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'typesafe-actions';

interface IPopState {
  modalState: boolean;
  columnId: string;
  cardId: string;
  cardTitle: string;
  cardContent: string;
  cardDate: Date;
  cardLabel: string;
}

const reducers: CreateSliceOptions['reducers'] = {
  setModalPopState: (state: IPopState, action: PayloadAction<IPopState>) => {
    state.modalState = !action.payload.modalState;
    state.columnId = action.payload.columnId;
    state.cardId = action.payload.cardId;
    state.cardTitle = action.payload.cardTitle;
    state.cardContent = action.payload.cardContent;
    state.cardDate = action.payload.cardDate;
    state.cardLabel = action.payload.cardLabel;
  },
};

const popSlice = createSlice({
  name: 'pop',
  initialState: {
    modalState: false,
    columnId: null,
    cardId: null,
    cardTitle: null,
    cardContent: null,
    cardDate: null,
    cardLabel: null,
  },
  reducers,
});

const { setModalPopState } = popSlice.actions;

export const setModalPopStateAction = (payload: IPopState): Action => setModalPopState(payload);

export default popSlice.reducer;
