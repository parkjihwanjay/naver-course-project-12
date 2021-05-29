/* eslint-disable no-param-reassign */
import { ICard } from '@/interfaces/ICard';
import { ICardList, IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';
import { IColumn } from '@/interfaces/IColumn';
import { swapItem } from '@/utils';
import { Action, createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { cardList } from '@/data';

interface IAddColumnPayload {
  title: string;
  items: ICard;
}

const reducers: CreateSliceOptions['reducers'] = {
  addColumn: (state: ICardList, action: PayloadAction<IAddColumnPayload>) => {
    state.push({ title: action.payload.title, items: action.payload.items });
  },
  dragCard: (state: ICardList, action: PayloadAction<IDragCardPayload>) => {
    const { columnIndex, cardIndex, dragColumnIndex, dragItemCardIndex } = action.payload;
    state[columnIndex].items.splice(cardIndex, 0, state[dragColumnIndex].items.splice(dragItemCardIndex, 1)[0]);
  },
  dragColumn: (state: ICardList, action: PayloadAction<IDragColumnPayload>) => {
    const { targetColumnTitle, dragColumnTitle } = action.payload;
    const grpI = state.findIndex((el) => el.title === targetColumnTitle);
    const dragColumnIndex = state.findIndex((el) => el.title === dragColumnTitle);
    swapItem<IColumn>(state, grpI, dragColumnIndex);
  },
};

const initialState = cardList;

const cardListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers,
});

const { addColumn, dragColumn, dragCard } = cardListSlice.actions;

export const addColumnAction = (payload: IAddColumnPayload): Action => addColumn(payload);
export const dragCardAction = (payload: IDragCardPayload): Action => dragCard(payload);
export const dragColumnAction = (payload: IDragColumnPayload): Action => dragColumn(payload);

export default cardListSlice.reducer;
