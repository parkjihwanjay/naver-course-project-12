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
  isEditing: boolean;
}
interface IDeleteColumnPayload {
  title: string;
}

interface IEditColumnStartPayload {
  title: string;
  columnIndex: number;
}
interface IEditColumnSavePayload {
  title: string;
  columnIndex: number;
  newTitle: string;
}

const reducers: CreateSliceOptions['reducers'] = {
  addColumn: (state: ICardList, action: PayloadAction<IAddColumnPayload>) => {
    state.push({ title: action.payload.title, items: action.payload.items, isEditing: action.payload.isEditing });
  },
  deleteColumn: (state: ICardList, action: PayloadAction<IDeleteColumnPayload>) => {
    const deleteColumnTitle = action.payload.title;
    const deleteColumnIndex = state.findIndex((el) => el.title === deleteColumnTitle);
    state.splice(deleteColumnIndex, 1);
  },
  editColumnStart: (state: ICardList, action: PayloadAction<IEditColumnStartPayload>) => {
    const { title, columnIndex } = action.payload;
    const columnIndexToEdit = state.findIndex((el, index) => el.title === title && index === columnIndex);
    state[columnIndexToEdit].isEditing = true;
  },
  editColumnSave: (state: ICardList, action: PayloadAction<IEditColumnSavePayload>) => {
    const { title, columnIndex, newTitle } = action.payload;
    const columnIndexToEdit = state.findIndex((el, index) => el.title === title && index === columnIndex);
    state[columnIndexToEdit].title = newTitle;
    state[columnIndexToEdit].isEditing = false;
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

const { addColumn, deleteColumn, editColumnStart, editColumnSave, dragColumn, dragCard } = cardListSlice.actions;

export const addColumnAction = (payload: IAddColumnPayload): Action => addColumn(payload);
export const deleteColumnAction = (payload: IDeleteColumnPayload): Action => deleteColumn(payload);
export const editColumnStartAction = (payload: IEditColumnStartPayload): Action => editColumnStart(payload);
export const editColumnSaveAction = (payload: IEditColumnSavePayload): Action => editColumnSave(payload);
export const dragCardAction = (payload: IDragCardPayload): Action => dragCard(payload);
export const dragColumnAction = (payload: IDragColumnPayload): Action => dragColumn(payload);

export default cardListSlice.reducer;
