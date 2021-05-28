import { IColumn } from './IColumn';

export type ICardList = IColumn[];

export interface IDragCardPayload {
  columnIndex: number;
  cardIndex: number;
  dragGrpI: number;
  dragItemCardIndex: number;
}

export interface IDragColumnPayload {
  targetColumnTitle: string;
  dragColumnTitle: string;
}
