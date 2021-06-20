import { TReturn } from '@/interfaces/api';

import { getJwtTokenHeader } from '@/utils';
import fetchApi from './fetch';
import urls from './config/urls';
import { IBoardModel, IUpdateBoard } from '../interfaces/IBoard';

const BoardApi = {
  getBoardList: (): TReturn<IBoardModel[]> => {
    return fetchApi({
      config: {
        url: urls.BOARD,
        headers: getJwtTokenHeader(),
        method: 'GET',
      },
    });
  },
  createBoard: (title: string): TReturn<IBoardModel> => {
    return fetchApi({
      config: {
        url: urls.BOARD,
        headers: getJwtTokenHeader(),
        method: 'POST',
        data: {
          imgUrl: '',
        },
      },
    });
  },
  getBoard: (boardId: string): TReturn<IBoardModel> => {
    return fetchApi({
      config: {
        url: `${urls.BOARD}/${boardId}`,
        method: 'GET',
      },
    });
  },
  deleteBoard: (boardId: string): TReturn<void> => {
    return fetchApi({
      config: {
        url: `${urls.BOARD}/${boardId}`,
        method: 'delete',
      },
    });
  },
  updateBoard: (boardId: string, data: IUpdateBoard): TReturn<IBoardModel> => {
    return fetchApi({
      config: {
        url: `${urls.BOARD}/${boardId}`,
        method: 'PATCH',
        data,
      },
    });
  },
};

export default BoardApi;
