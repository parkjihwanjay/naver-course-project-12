import { ICardList } from '@/interfaces/ICardList';
import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';
import { ICardListModel } from '@/interfaces/api/card-list';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'POST': {
      const { title, items } = req.body;
      const cardList = CardListModel.readData<ICardListModel>();
      const { id } = cardList[cardList.length - 1];
      const newColumn = { title, items, id: `${+id + 1}` };
      cardList.push(newColumn);
      CardListModel.writeData<ICardListModel>(cardList);
      res.status(200).json(newColumn);
      break;
    }
    default:
      res.status(200);
  }
};
