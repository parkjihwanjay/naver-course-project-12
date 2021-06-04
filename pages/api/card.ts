import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';
import { ICardListModel } from '@/interfaces/api/card-list';
import { findById } from '@/utils';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const cardList = CardListModel.readData<ICardListModel>();
  const counter = CardListModel.readCounter();
  switch (req.method) {
    case 'PATCH': {
      const { list } = req.body;
      CardListModel.writeData<ICardListModel>(list);
      res.status(200).json(list);
      break;
    }
    case 'POST': {
      const { columnId, content } = req.body;
      const { item } = findById(cardList, columnId);
      const targetColumn = item;
      const newCard = { content, id: `${counter + 1}` };
      targetColumn.items.push({ content, id: `${counter + 1}` });
      CardListModel.writeCounter(counter + 1);
      CardListModel.writeData(cardList);
      res.status(200).json(newCard);
      break;
    }
    default:
      res.status(200);
  }
};
