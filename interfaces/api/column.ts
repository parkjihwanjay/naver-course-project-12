import { ICard } from '../ICard';

export interface IColumnModel {
  id: string;
  title: string;
  items: ICard;
}

export interface ColumnDTO {
  title: string;
  items: ICard;
}
