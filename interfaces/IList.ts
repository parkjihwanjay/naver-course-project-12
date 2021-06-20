import { IBoard } from './IBoard';
import { ICard } from './ICard';

export interface IListModel extends IList {
  board: IBoard;
}
export interface IList {
  id: string;
  title: string;
  cards: ICard[];
}

export interface IUpdateList {
  title?: string;
  cards?: ICard[];
}

export interface IDragListPayload {
  targetListId: string;
  dragListId: string;
}
