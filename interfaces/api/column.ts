import { ICardModel } from './card';

export interface IColumnModel {
  id: string;
  title: string;
  items: ICardModel;
}

export interface addColumnDTO {
  title: string;
  items: ICardModel;
}

export interface dragColumnDTO {
  targetColumnId: string;
  dragColumnId: string;
}
