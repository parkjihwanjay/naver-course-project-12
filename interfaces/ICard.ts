import { ILabel } from './Ilabel';
import { IList } from './IList';

export type ICardItems = ICard[];

export interface ICardModel extends ICard {
  list: IList;
}
export interface ICard extends ICardInitial {
  id: string;
  labels: ILabel[];
}

export interface ICardInitial {
  title: string;
  content: string;
  date: string;
}

export interface IUpdateCard {
  title?: string;
  content?: string;
  date?: Date;
  labels?: ILabel[];
}

export interface IDragCardPayload {
  listIndex: number;
  cardIndex: number;
  dragListIndex: number;
  dragCardIndex: number;
}

export interface addCardPayload extends ICard {
  columnId: string;
}
