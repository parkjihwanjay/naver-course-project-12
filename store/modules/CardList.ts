import { ICard } from '@/interfaces/ICard';
import { ICardList } from '@/interfaces/ICardList';
import {
  Action,
  createSlice,
  CreateSliceOptions,
  PayloadAction,
} from '@reduxjs/toolkit';

const dummyData: ICardList = [
  { title: 'group 1', items: ['1', '2', '3'] },
  { title: 'group 2', items: ['4', '5'] },
  { title: 'group 3', items: [] },
];

interface IAddColumnPayload {
  title: string;
  items: ICard;
}

interface ISetCardListPayload {
  currentItem: { grpI: number; itemI: number };
  params: { grpI: number; itemI: number };
}

const reducers: CreateSliceOptions['reducers'] = {
  addColumn: (state: ICardList, action: PayloadAction<IAddColumnPayload>) => {
    state.push({ title: action.payload.title, items: action.payload.items });
  },
  setCardList: (
    state: ICardList,
    action: PayloadAction<ISetCardListPayload>,
  ) => {
    const { currentItem, params } = action.payload;
    const deletedCard = state[currentItem.grpI].items.splice(
      currentItem.itemI,
      1,
    )[0];

    state[params.grpI].items.splice(params.itemI, 0, deletedCard);
  },
};

const initialState = dummyData;

const cardListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers,
});

const { addColumn, setCardList } = cardListSlice.actions;

export const addColumnAction = (payload: IAddColumnPayload): Action =>
  addColumn(payload);

export const setCardListAction = (payload: ISetCardListPayload): Action =>
  setCardList(payload);

export default cardListSlice.reducer;
