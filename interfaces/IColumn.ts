import { ICard } from './ICard';

export interface IColumn {
  id: string;
  title: string;
  items: ICard;
  isEditing: boolean;
}
