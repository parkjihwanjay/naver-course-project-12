import { TReturn } from '@/interfaces/api';

import fetchApi from './fetch';
import urls from './config/urls';
import { IUpdateList, IListModel } from '../interfaces/IList';

const ListApi = {
  getLists: (): TReturn<IListModel[]> => {
    return fetchApi<IListModel[]>({
      config: {
        url: urls.LIST,
        method: 'GET',
      },
    });
  },
  createList: (boardId: string, title: string): TReturn<IListModel> => {
    return fetchApi({
      config: {
        url: urls.LIST,
        method: 'POST',
        data: {
          boardId,
          title,
        },
      },
    });
  },
  getList: (listId: string): TReturn<IListModel> => {
    return fetchApi({
      config: {
        url: `${urls.LIST}/${listId}`,
        method: 'GET',
      },
    });
  },
  deleteList: (listId: string): TReturn<IListModel> => {
    return fetchApi({
      config: {
        url: `${urls.LIST}/${listId}`,
        method: 'DELETE',
      },
    });
  },
  updateList: (listId: string, data: IUpdateList): TReturn<IListModel> => {
    return fetchApi({
      config: {
        url: `${urls.LIST}/${listId}`,
        method: 'PATCH',
        data,
      },
    });
  },
};

export default ListApi;
