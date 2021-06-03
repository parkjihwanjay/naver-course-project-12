import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';
import { ICardListModel } from '@/interfaces/api/card-list';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'PATCH': {
      const { list } = req.body;
      CardListModel.writeData<ICardListModel>(list);
      res.status(200).json(list);
      break;
    }
    default:
      res.status(200);
  }
};
