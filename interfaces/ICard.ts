export type ICardItems = ICard[];

export interface ICard {
  id: string;
  title: string;
  content: string;
  date: Date;
  label: string;
}
export interface IDragCardPayload {
  columnIndex: number;
  cardIndex: number;
  dragColumnIndex: number;
  dragItemCardIndex: number;
}

export interface addCardPayload extends ICard {
  columnId: string;
}
