import { TReturn } from '@/interfaces/api';
import { addColumnDTO, IColumn } from '@/interfaces/IColumn';
import { ICardList } from '@/interfaces/ICardList';
import { ICard } from '@/interfaces/ICard';

import fetchApi from './fetch';
import urls from './config/urls';

const ColumnApi = {
  addColumn: ({ title, items }: addColumnDTO): TReturn<IColumn> => {
    return fetchApi({
      url: urls.COLUMN,
      method: 'POST',
      data: {
        title,
        items,
      },
    });
  },
  dragColumn: (list: ICardList): TReturn<ICardList> => {
    return fetchApi({
      url: urls.COLUMN,
      method: 'PATCH',
      data: {
        list,
      },
    });
  },
  deleteColumn: (id: string): TReturn<IColumn> => {
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
