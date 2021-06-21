/* eslint-disable no-param-reassign */
import CardApi from '@/api/card';
import { ICard, ICardItems, IUpdateCard } from '@/interfaces/ICard';

import { updateValues } from '@/utils';
import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { ActionType } from 'typesafe-actions';
import { deleteById, findById } from '@/utils/handleArray';

import { IRootState } from './RootState';
import { setCardEditingStateAction, setListEditingStateAction } from './Editing';
import BoardApi from '../../api/board';
import { IBoard, IBoardModel } from '../../interfaces/IBoard';
import ListApi from '../../api/list';
import { IList, IUpdateList, IListModel, IDragListPayload } from '../../interfaces/IList';
import { ICardInitial, ICardModel, IDragCardPayload } from '../../interfaces/ICard';
import { swapItem } from '../../utils/handleArray';

const reducers: CreateSliceOptions['reducers'] = {
  initialize: (state: IBoard, action: PayloadAction<IBoardModel>) => {
    const { id, imgUrl, lists, labels } = action.payload;
    updateValues(state, { id, imgUrl, lists, labels });
  },
  addList: (state: IBoard, action: PayloadAction<IListModel>) => {
    const { id, title, cards }: IList = action.payload;
    state.lists.push({ id, title, cards });
  },
  addCard: (state: IBoard, action: PayloadAction<{ listId: string; card: ICardModel }>) => {
    const { listId, card } = action.payload;
    const list = findById<IList>(state.lists, listId).item;
    const { id, labels, title, content, date }: ICard = card;
    list.cards.push({ id, labels, title, content, date });
  },
  deleteList: (state: IBoard, action: PayloadAction<string>) => {
    const deleteListId = action.payload;
    deleteById<IList>(state.lists, deleteListId);
  },
  deleteCard: (state: IBoard, action: PayloadAction<{ listId: string; cardId: string }>) => {
    const { listId, cardId } = action.payload;
    const list = findById(state.lists, listId).item;
    deleteById(list.cards, cardId);
  },
  editList: (state: IBoard, action: PayloadAction<IListModel>) => {
    const { id, title, cards } = action.payload;
    const listToEdit = findById<IList>(state.lists, id);
    listToEdit.item.title = title;
    listToEdit.item.cards = cards;
  },
  editCard: (state: IBoard, action: PayloadAction<ICardModel>) => {
    const { id, list, title, content, labels, date } = action.payload;
    const result = findById(state.lists, list.id);
    const editList = result.item;
    const { item } = findById(editList.cards, id);
    const card = item;
    updateValues(card, { title, content, labels, date });
  },
  dragCard: (state: IBoard, action: PayloadAction<IDragCardPayload>) => {
    const { listIndex, cardIndex, dragListIndex, dragCardIndex } = action.payload;
    const deletedCard = state.lists[dragListIndex].cards.splice(dragCardIndex, 1)[0];
    state.lists[listIndex].cards.splice(cardIndex, 0, deletedCard);
  },
  dragList: (state: IBoard, action: PayloadAction<IDragListPayload>) => {
    const { targetListId, dragListId } = action.payload;
    const targetIndex = findById(state.lists, targetListId).index;
    const dragIndex = findById(state.lists, dragListId).index;
    swapItem(state.lists, targetIndex, dragIndex);
  },
  updateBoard: (state: IBoard, action: PayloadAction<IBoardModel>) => {
    const { imgUrl, lists } = action.payload;
    updateValues(state, { imgUrl, lists });
  },
  // popModal: (state: ICardList, action: PayloadAction<IPopModalPayload>) => {
  //   return action.payload;
  // },
};

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    id: '',
    imgUrl: '',
    lists: [],
    labels: [],
  },
  reducers,
});

const { addList, deleteList, updateBoard, addCard, deleteCard, editCard, initialize, dragCard, dragList, editList } = boardSlice.actions;

export const initializeAction = (payload: IBoardModel): Action => initialize(payload);
export const addListAction = (payload: IListModel): Action => addList(payload);
export const addCardAction = (listId: string, card: ICardModel): Action => addCard({ listId, card });
export const deleteListAction = (listId: string): Action => deleteList(listId);
export const deleteCardAction = (listId: string, cardId: string): Action => deleteCard({ listId, cardId });
export const editCardAction = (payload: ICardModel): Action => editCard(payload);
export const editListAction = (payload: IListModel): Action => editList(payload);
export const dragCardAction = (payload: IDragCardPayload): Action => dragCard(payload);
export const dragListAction = (payload: IDragListPayload): Action => dragList(payload);
export const updateBoardAction = (payload: IBoardModel): Action => updateBoard(payload);

export const initializeThunk =
  (boardId: string): ThunkAction<void, IRootState, null, ActionType<typeof initializeAction>> =>
  async (dispatch) => {
    const [data, error] = await BoardApi.getBoard(boardId);
    dispatch(initializeAction(data));
  };
export const addListThunk =
  (title: string): ThunkAction<void, IRootState, null, ActionType<typeof addListAction>> =>
  async (dispatch, getState) => {
    const { board } = getState();
    const [data, error] = await ListApi.createList(board.id, title);
    dispatch(addListAction(data));
  };
export const addCardThunk = (listId: string, card: ICardInitial) => async (dispatch) => {
  const [newCard, error] = await CardApi.addCard(listId, card);
  dispatch(addCardAction(listId, newCard));
};
export const deleteListThunk =
  (listId: string): ThunkAction<void, IRootState, null, ActionType<typeof deleteListAction>> =>
  async (dispatch) => {
    const [data, error] = await ListApi.deleteList(listId);
    dispatch(deleteListAction(listId));
  };
export const deleteCardThunk =
  (listId: string, cardId: string): ThunkAction<void, IRootState, null, ActionType<typeof deleteCardAction>> =>
  async (dispatch) => {
    const [data, error] = await CardApi.deleteCard(cardId);
    dispatch(deleteCardAction(listId, cardId));
  };
export const editCardThunk = (cardId: string, data: IUpdateCard) => async (dispatch) => {
  const [editedCard, error] = await CardApi.updateCard(cardId, data);
  dispatch(editCardAction(editedCard));
  dispatch(setCardEditingStateAction(null));
};

export const editListThunk = (listId: string, data: IUpdateList) => async (dispatch) => {
  const [updatedList, error] = await ListApi.updateList(listId, data);
  dispatch(editListAction(updatedList));
  dispatch(setListEditingStateAction(null));
};

export const dragThunk = (): ThunkAction<void, IRootState, null, ActionType<typeof updateBoardAction>> => async (dispatch, getState) => {
  const { board } = getState();
  const { lists } = board;
  const [data, error] = await BoardApi.updateBoard(board.id, { lists });
  // dispatch(updateBoardAction(data));
};

export default boardSlice.reducer;
