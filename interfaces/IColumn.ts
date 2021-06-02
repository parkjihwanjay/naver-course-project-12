import { ICard } from './ICard';

export interface IColumn {
  title: string;
  items: ICard;
  isEditing: boolean;
}
