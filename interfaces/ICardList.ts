import { IColumn } from './IColumn';

export type ICardList = IColumn[];

export interface IDragCardPayload {
  columnIndex: number;
  cardIndex: number;
  dragColumnIndex: number;
  dragItemCardIndex: number;
}

export interface IDragColumnPayload {
  targetColumnId: string;
  dragColumnId: string;
}
