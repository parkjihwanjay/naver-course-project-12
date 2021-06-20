/* eslint-disable no-param-reassign */
import CardListApi from '@/api/card-list';
import ColumnApi from '@/api/column';
import CardApi from '@/api/card';
import { IColumn, IDragColumnPayload } from '@/interfaces/IColumn';
import { ICardList } from '@/interfaces/ICardList';
import { addCardPayload, ICard, ICardItems, IDragCardPayload } from '@/interfaces/ICard';

import { swapItem, updateValues } from '@/utils';
import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { ActionType } from 'typesafe-actions';
import { deleteById, findById } from '@/utils/handleArray';

import { CardMedia } from '@material-ui/core';
import { IRootState } from './RootState';
import { setColumnEditingStateAction, setCardEditingStateAction } from './Editing';

interface IAddColumnPayload {
  title: string;
  items: ICardItems;
  id: string;
}
interface IDeleteColumnPayload {
  id: string;
}

interface IEditColumnSavePayload {
  id: string;
  newTitle: string;
}
interface IAddCardPayload {
  columnId: string;
  card: ICard;
}
interface IDeleteCardPayload {
  columnId: string;
  id: string;
}
interface IEditCardSavePayload {
  columnId: string;
  cardId: string;
  title: string;
  content: string;
  lable: string;
  date: Date;
}

const reducers: CreateSliceOptions['reducers'] = {
  initialize: (state: ICardList, action: PayloadAction<ICardList>) => {
    return action.payload;
  },
  setCardList: (state: ICardList, action: PayloadAction<ICardList>) => {
    return action.payload;
  },
  addColumn: (state: ICardList, action: PayloadAction<IAddColumnPayload>) => {
    const { title, items, id } = action.payload;
    state.push({ id, title, items });
  },
  deleteColumn: (state: ICardList, action: PayloadAction<IDeleteColumnPayload>) => {
    const deleteColumnId = action.payload.id;
    deleteById<IColumn>(state, deleteColumnId);
  },
  editColumnSave: (state: ICardList, action: PayloadAction<IEditColumnSavePayload>) => {
    const { id, newTitle } = action.payload;
    const columnToEdit = findById<IColumn>(state, id);
    columnToEdit.item.title = newTitle;
  },
  addCard: (state: ICardList, action: PayloadAction<IAddCardPayload>) => {
    const { columnId, card } = action.payload;
    const result = findById(state, columnId);
    const column = result.item;
    column.items.push(card);
  },
  deleteCard: (state: ICardList, action: PayloadAction<IDeleteCardPayload>) => {
    const { columnId, id } = action.payload;
    const deleteCardColumnIndex = state.findIndex((el) => el.id === columnId);
    deleteById<ICard>(state[deleteCardColumnIndex].items, id);
  },
  editCardSave: (state: ICardList, action: PayloadAction<IEditCardSavePayload>) => {
    const { cardId, columnId, title, content, lable, date } = action.payload;
    const editColumn = findById<IColumn>(state, columnId).item;
    const editCard = findById<ICard>(editColumn.items, cardId).item;
    updateValues<ICard>(editCard, { title, content, lable, date });
  },
  dragCard: (state: ICardList, action: PayloadAction<IDragCardPayload>) => {
    const { columnIndex, cardIndex, dragColumnIndex, dragItemCardIndex } = action.payload;
    const deletedCard = state[dragColumnIndex].items.splice(dragItemCardIndex, 1)[0];
    state[columnIndex].items.splice(cardIndex, 0, deletedCard);
  },
  dragColumn: (state: ICardList, action: PayloadAction<IDragColumnPayload>) => {
    const { targetColumnId, dragColumnId } = action.payload;
    const targetColumn = findById<IColumn>(state, targetColumnId);
    const dragColumn = findById<IColumn>(state, dragColumnId);
    swapItem<IColumn>(state, targetColumn.index, dragColumn.index);
  },
  popModal: (state: ICardList, action: PayloadAction<IPopModalPayload>) => {
    return action.payload;
  },
};

const cardListSlice = createSlice({
  name: 'cardList',
  initialState: [],
  reducers,
});

const { addColumn, deleteColumn, editColumnSave, addCard, deleteCard, editCardSave, dragColumn, dragCard, initialize, setCardList } =
  cardListSlice.actions;

export const initializeAction = (payload: ICardList): Action => initialize(payload);
export const setCardListAction = (payload: ICardList): Action => setCardList(payload);
export const addColumnAction = (payload: IAddColumnPayload): Action => addColumn(payload);
export const deleteColumnAction = (payload: IDeleteColumnPayload): Action => deleteColumn(payload);
export const addCardAction = (payload: IAddCardPayload): Action => addCard(payload);
export const deleteCardAction = (payload: IDeleteCardPayload): Action => deleteCard(payload);
export const editColumnSaveAction = (payload: IEditColumnSavePayload): Action => editColumnSave(payload);
export const editCardSaveAction = (payload: IEditCardSavePayload): Action => editCardSave(payload);
export const dragCardAction = (payload: IDragCardPayload): Action => dragCard(payload);
export const dragColumnAction = (payload: IDragColumnPayload): Action => dragColumn(payload);
export const popModalAction = (payload: IPopModalPayload): Action => popModal(payload);

export const addColumnThunk =
  (title: string, items: ICardItems): ThunkAction<void, IRootState, null, ActionType<typeof addColumnAction>> =>
  async (dispatch) => {
    const [data, error] = await ColumnApi.addColumn({ title, items });
    dispatch(addColumnAction(data));
  };

export const addCardThunk = (params: addCardPayload) => async (dispatch) => {
  const [data, error] = await CardApi.addCard(params);
  dispatch(addCardAction({ columnId: params.columnId, card: data }));
};

export const initializeThunk = (): ThunkAction<void, IRootState, null, ActionType<typeof initializeAction>> => async (dispatch) => {
  const [data, error] = await CardListApi.getCardList();
  dispatch(initializeAction(data));
};

export const dragColumnThunk =
  (list: ICardList): ThunkAction<void, IRootState, null, ActionType<typeof dragColumnAction>> =>
  async (dispatch) => {
    const [data, error] = await ColumnApi.dragColumn(list);
    dispatch(setCardListAction(data));
  };

export const dragCardThunk =
  (list: ICardList): ThunkAction<void, IRootState, null, ActionType<typeof dragCardAction>> =>
  async (dispatch) => {
    const [data, error] = await CardApi.dragCard(list);
    dispatch(setCardListAction(data));
  };

export const editColumnSaveThunk = (id: string, newTitle: string) => async (dispatch) => {
  const [data, error] = await ColumnApi.editColumnTitle(id, newTitle);
  dispatch(editColumnSaveAction({ id, newTitle }));
  dispatch(setColumnEditingStateAction(null));
};
export const deleteColumnThunk =
  (id: string): ThunkAction<void, IRootState, null, ActionType<typeof deleteColumnAction>> =>
  async (dispatch) => {
    const [data, error] = await ColumnApi.deleteColumn(id);
    dispatch(deleteColumnAction({ id: data.id }));
  };

export const editCardSaveThunk = (params: IEditCardSavePayload) => (dispatch) => {
  dispatch(editCardSaveAction(params));
  dispatch(setCardEditingStateAction(null));
};

export default cardListSlice.reducer;
