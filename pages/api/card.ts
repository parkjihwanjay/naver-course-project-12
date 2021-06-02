import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';
import { ICardListModel } from '@/interfaces/api/card-list';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const cardList = CardListModel.readData<ICardListModel>();
  switch (req.method) {
    case 'PATCH': {
      const { columnIndex, cardIndex, dragColumnIndex, dragItemCardIndex } = req.body;
      const deletedCard = cardList[dragColumnIndex].items.splice(dragItemCardIndex, 1)[0];
      cardList[columnIndex].items.splice(cardIndex, 0, deletedCard);
      CardListModel.writeData<ICardListModel>(cardList);
      res.status(200).json(cardList);
      break;
    }
    default:
      res.status(200);
  }
};
