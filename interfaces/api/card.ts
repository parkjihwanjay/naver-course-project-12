export type ICardItmesModel = ICardModel[];

export interface ICardModel {
  id: string;
  content: string;
}

export interface dragCardDTO {
  columnIndex: number;
  cardIndex: number;
  dragColumnIndex: number;
  dragItemCardIndex: number;
}
