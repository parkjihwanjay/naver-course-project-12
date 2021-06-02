import { ICardItems } from './ICard';

export interface IColumn {
  id: string;
  title: string;
  items: ICardItems;
  isEditing: boolean;
}
