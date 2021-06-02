import type { NextApiRequest, NextApiResponse } from 'next';
import CardListModel from '@/data/model/CardListModel';
import { ICardListModel } from '@/interfaces/api/card-list';
import { swapItem } from '@/utils';
import { IColumnModel } from '@/interfaces/api/column';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const cardList = CardListModel.readData<ICardListModel>();
  switch (req.method) {
    case 'POST': {
      const { title, items } = req.body;
      const { id } = cardList[cardList.length - 1];
      const newColumn = { title, items, id: `${+id + 1}` };
      cardList.push(newColumn);
      CardListModel.writeData<ICardListModel>(cardList);
      res.status(200).json(newColumn);
      break;
    }
    case 'PATCH': {
      const { targetColumnId, dragColumnId } = req.body;
      const targetColumnIndex = cardList.findIndex((el) => el.id === targetColumnId);
      const dragColumnIndex = cardList.findIndex((el) => el.id === dragColumnId);
      swapItem<IColumnModel>(cardList, targetColumnIndex, dragColumnIndex);
      CardListModel.writeData<ICardListModel>(cardList);
      res.status(200).json(cardList);
      break;
    }
    default:
      res.status(200);
  }
};
