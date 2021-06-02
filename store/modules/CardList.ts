/* eslint-disable no-param-reassign */
import { ICard } from '@/interfaces/ICard';
import { ICardList, IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';
import { IColumn } from '@/interfaces/IColumn';
import { swapItem } from '@/utils';
import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import CardListApi from '@/api/card-list';
import ColumnApi from '@/api/column';
import { ActionType } from 'typesafe-actions';
import { IRootState } from './RootState';

interface IAddColumnPayload {
  title: string;
  items: ICard;
  id: string;
}

const reducers: CreateSliceOptions['reducers'] = {
  initialize: (state: ICardList, action: PayloadAction<ICardList>) => {
    return action.payload;
  },
  addColumn: (state: ICardList, action: PayloadAction<IAddColumnPayload>) => {
    const { title, items, id } = action.payload;
    state.push({ title, items, id });
  },
  dragCard: (state: ICardList, action: PayloadAction<IDragCardPayload>) => {
    const { columnIndex, cardIndex, dragColumnIndex, dragItemCardIndex } = action.payload;
    state[columnIndex].items.splice(cardIndex, 0, state[dragColumnIndex].items.splice(dragItemCardIndex, 1)[0]);
  },
  dragColumn: (state: ICardList, action: PayloadAction<IDragColumnPayload>) => {
    const { targetColumnId, dragColumnId } = action.payload;
    const grpI = state.findIndex((el) => el.id === targetColumnId);
    const dragColumnIndex = state.findIndex((el) => el.id === dragColumnId);
    swapItem<IColumn>(state, grpI, dragColumnIndex);
  },
};

const cardListSlice = createSlice({
  name: 'cardList',
  initialState: [],
  reducers,
});

const { addColumn, dragColumn, dragCard, initialize } = cardListSlice.actions;

export const addColumnAction = (payload: IAddColumnPayload): Action => addColumn(payload);
export const dragCardAction = (payload: IDragCardPayload): Action => dragCard(payload);
export const dragColumnAction = (payload: IDragColumnPayload): Action => dragColumn(payload);
export const initializeAction = (payload: ICardList): Action => initialize(payload);

export const addColumnThunk =
  (title: string, items: ICard): ThunkAction<void, IRootState, null, ActionType<typeof addColumnAction>> =>
  async (dispatch) => {
    const [data, error] = await ColumnApi.addColumn({ title, items });
    dispatch(addColumnAction(data));
  };

export const initializeThunk = (): ThunkAction<void, IRootState, null, ActionType<typeof initializeAction>> => async (dispatch) => {
  const [data, error] = await CardListApi.getCardList();
  dispatch(initializeAction(data));
};

export default cardListSlice.reducer;
