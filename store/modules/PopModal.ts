/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'typesafe-actions';
import { ICard } from '../../interfaces/ICard';

export interface IPopState {
  modalState: boolean;
  card: ICard;
}

const cardInital = {
  id: '',
  title: '',
  content: '',
  labels: [],
  date: new Date().toDateString(),
};

const reducers: CreateSliceOptions['reducers'] = {
  onModal: (state: IPopState, action: PayloadAction<ICard>) => {
    state.modalState = true;
    state.card = action.payload;
  },
  offModal: (state: IPopState) => {
    state.modalState = false;
    state.card = cardInital;
  },
};

const popSlice = createSlice({
  name: 'pop',
  initialState: {
    card: cardInital,
    modalState: false,
  },
  reducers,
});

const { onModal, offModal } = popSlice.actions;

export const onModalAction = (card: ICard): Action => onModal(card);
export const offModalAction = (): Action => offModal(null);

export default popSlice.reducer;
