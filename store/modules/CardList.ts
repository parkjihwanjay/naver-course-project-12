/* eslint-disable no-param-reassign */
import CardListApi from '@/api/card-list';
import ColumnApi from '@/api/column';
import CardApi from '@/api/card';
import { IColumn } from '@/interfaces/IColumn';
import { ICardList, IDragCardPayload, IDragColumnPayload } from '@/interfaces/ICardList';
import { ICardListModel } from '@/interfaces/api/card-list';
import { ICardItmesModel } from '@/interfaces/api/card';
import { swapItem } from '@/utils';
import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { ActionType } from 'typesafe-actions';
import { IRootState } from './RootState';
import { setEditingStateAction } from './Editing';

interface IAddColumnPayload {
  title: string;
  items: ICardItmesModel;
  id: string;
}
interface IDeleteColumnPayload {
  id: string;
}

interface IEditColumnSavePayload {
  id: string;
  newTitle: string;
}

const reducers: CreateSliceOptions['reducers'] = {
  initialize: (state: ICardList, action: PayloadAction<ICardListModel>) => {
    return action.payload;
  },
  setCardList: (state: ICardList, action: PayloadAction<ICardListModel>) => {
    return action.payload;
  },
  addColumn: (state: ICardList, action: PayloadAction<IAddColumnPayload>) => {
    const { title, items, id } = action.payload;
    state.push({ id, title, items });
  },
  deleteColumn: (state: ICardList, action: PayloadAction<IDeleteColumnPayload>) => {
    const deleteColumnId = action.payload.id;
    const deleteColumnIndex = state.findIndex((el) => el.id === deleteColumnId);
    state.splice(deleteColumnIndex, 1);
  },
  editColumnSave: (state: ICardList, action: PayloadAction<IEditColumnSavePayload>) => {
    const { id, newTitle } = action.payload;
    const columnToEdit = state.find((el) => el.id === id);
    columnToEdit.title = newTitle;
  },
  dragCard: (state: ICardList, action: PayloadAction<IDragCardPayload>) => {
    const { columnIndex, cardIndex, dragColumnIndex, dragItemCardIndex } = action.payload;
    const deletedCard = state[dragColumnIndex].items.splice(dragItemCardIndex, 1)[0];
    state[columnIndex].items.splice(cardIndex, 0, deletedCard);
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

const { addColumn, deleteColumn, editColumnStart, editColumnSave, dragColumn, dragCard, initialize, setCardList } = cardListSlice.actions;

export const initializeAction = (payload: ICardListModel): Action => initialize(payload);
export const setCardListAction = (payload: ICardListModel): Action => setCardList(payload);
export const addColumnAction = (payload: IAddColumnPayload): Action => addColumn(payload);
export const deleteColumnAction = (payload: IDeleteColumnPayload): Action => deleteColumn(payload);
export const editColumnSaveAction = (payload: IEditColumnSavePayload): Action => editColumnSave(payload);
export const dragCardAction = (payload: IDragCardPayload): Action => dragCard(payload);
export const dragColumnAction = (payload: IDragColumnPayload): Action => dragColumn(payload);

export const addColumnThunk =
  (title: string, items: ICardItmesModel): ThunkAction<void, IRootState, null, ActionType<typeof addColumnAction>> =>
  async (dispatch) => {
    const [data, error] = await ColumnApi.addColumn({ title, items });
    dispatch(addColumnAction(data));
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

export const editColumnSaveThunk = (id: string, newTitle: string) => (dispatch) => {
  dispatch(editColumnSaveAction({ id, newTitle }));
  dispatch(setEditingStateAction(null));
};
export const deleteColumnThunk =
  (id: string): ThunkAction<void, IRootState, null, ActionType<typeof deleteColumnAction>> =>
  async (dispatch) => {
    const [data, error] = await ColumnApi.deleteColumn(id);
    dispatch(deleteColumnAction({ id: data.id }));
  };

export default cardListSlice.reducer;
