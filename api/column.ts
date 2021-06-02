import { TReturn } from '@/interfaces/api';
import { addColumnDTO, IColumnModel, dragColumnDTO } from '@/interfaces/api/column';
import { ICardList } from '@/interfaces/ICardList';
import { ICard } from '@/interfaces/ICard';

import { ICardListModel } from '@/interfaces/api/card-list';
import fetchApi from './fetch';
import urls from './config/urls';

const ColumnApi = {
  addColumn: ({ title, items }: addColumnDTO): TReturn<IColumnModel> => {
    return fetchApi({
      url: urls.COLUMN,
      method: 'POST',
      data: {
        title,
        items,
      },
    });
  },
  dragColumn: ({ targetColumnId, dragColumnId }: dragColumnDTO): TReturn<ICardListModel> => {
    return fetchApi({
      url: urls.COLUMN,
      method: 'PATCH',
      data: {
        targetColumnId,
        dragColumnId,
      },
    });
  },
  deleteColumn: (id: string): TReturn<ICardList> => {
    return fetchApi({
      url: `${urls.COLUMN}/${id}`,
      method: 'DELETE',
    });
  },
  editColumnTitle: (id: string, title: string): TReturn<ICard> => {
    return fetchApi({
      url: `${urls.COLUMN}/${id}`,
      method: 'PATCH',
      data: {
        title,
      },
    });
  },
};

export default ColumnApi;
