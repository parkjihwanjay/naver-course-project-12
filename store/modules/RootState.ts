import { ICardList } from '@/interfaces/ICardList';

export interface IRootState {
  cardList: ICardList;
  editing: {
    columnId: string;
    cardId: string;
  };
  pop: {
    modalState: boolean;
    cardId: string;
    cardTitle: string;
    cardContent: string;
    cardDate: Date;
    cardLabel: string;
  };
}
