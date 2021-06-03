import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';
import { ICardListModel } from '@/interfaces/api/card-list';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const cardList = CardListModel.readData<ICardListModel>();
  switch (req.method) {
    case 'POST': {
      const { title, items } = req.body;
      const counter = CardListModel.readCounter();
      const newColumn = { title, items, id: `${counter + 1}` };
      cardList.push(newColumn);
      CardListModel.writeData<ICardListModel>(cardList);
      res.status(200).json(newColumn);
      break;
    }
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
