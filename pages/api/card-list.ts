import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';
import { ICardListModel } from '@/interfaces/api/card-list';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'GET': {
      const cardList = CardListModel.readData<ICardListModel>();
      res.status(200).json(cardList);
      break;
    }
    default:
      res.status(200);
  }
};
