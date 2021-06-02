import { ICardList } from '@/interfaces/ICardList';
import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { id } = req.query;
  const cardList = CardListModel.readData<ICardList>();

  switch (req.method) {
    case 'DELETE': {
      const index = cardList.findIndex((el) => el.id === id);
      cardList.splice(index, 1);
      res.status(200).json(cardList);
      break;
    }
    case 'PATCH': {
      const { title } = req.body;
      const column = cardList.find((el) => el.id === id);
      if (column.title) column.title = title;
      CardListModel.writeData(cardList);
      res.status(200).json(column);
      break;
    }
    default:
      res.status(200);
  }
};