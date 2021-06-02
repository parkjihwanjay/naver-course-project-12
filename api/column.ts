import { ColumnDTO, TReturn } from '@/interfaces/api';
import { IColumn } from '@/interfaces/IColumn';
import { ICardList } from '@/interfaces/ICardList';
import { ICard } from '@/interfaces/ICard';
import fetchApi from './fetch';
import urls from './config/urls';

const ColumnApi = {
  addColumn: ({ title, items }: ColumnDTO): TReturn<IColumn> => {
    return fetchApi({
      url: urls.COLUMN,
      method: 'POST',
      data: {
        title,
        items,
      },
    });
  },
  deleteColumn: (id: string): TReturn<ICardList> => {
    return fetchApi({
      url: `${urls.column}/${id}`,
      method: 'DELETE',
    });
  },
  editColumnTitle: (id: string, title: string): TReturn<ICard> => {
    return fetchApi({
      url: `${urls.column}/${id}`,
      method: 'PATCH',
      data: {
        title,
      },
    });
  },
};

export default ColumnApi;
