import { ICardList } from '@/interfaces/ICardList';

export interface IRootState {
  cardList: ICardList;
  editing: {
    columnId: string;
    cardId: string;
  };
}
