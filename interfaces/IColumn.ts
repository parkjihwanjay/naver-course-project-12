import { ICardItems } from './ICard';

export interface IColumn {
  id: string;
  title: string;
  items: ICardItems;
}

export interface addColumnDTO {
  title: string;
  items: ICardItems;
}

export interface dragColumnDTO {
  targetColumnId: string;
  dragColumnId: string;
}

export interface IDragColumnPayload {
  targetColumnId: string;
  dragColumnId: string;
}
