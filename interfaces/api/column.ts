import { ICardItmesModel } from './card';

export interface IColumnModel {
  id: string;
  title: string;
  items: ICardItmesModel;
}

export interface addColumnDTO {
  title: string;
  items: ICardItmesModel;
}

export interface dragColumnDTO {
  targetColumnId: string;
  dragColumnId: string;
}
