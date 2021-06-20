import { TReturn } from '@/interfaces/api';

import fetchApi from './fetch';
import urls from './config/urls';
import { ILabel } from '../interfaces/Ilabel';

const LabelApi = {
  getLabelList: (): TReturn<ILabel[]> => {
    return fetchApi<ILabel[]>({
      config: {
        url: urls.LABEL,
        method: 'GET',
      },
    });
  },
  createLabel: (boardId: string, title: string): TReturn<ILabel> => {
    return fetchApi({
      config: {
        url: urls.LABEL,
        method: 'POST',
        data: {
          boardId,
          title,
        },
      },
    });
  },
  getLabel: (labelId: string): TReturn<ILabel> => {
    return fetchApi({
      config: {
        url: `${urls.LABEL}/${labelId}`,
        method: 'GET',
      },
    });
  },
  deleteLabel: (labelId: string): TReturn<ILabel> => {
    return fetchApi({
      config: {
        url: `${urls.LABEL}/${labelId}`,
        method: 'DELETE',
      },
    });
  },
  updateLabel: (labelId: string, data: { title: string; color: string }): TReturn<ILabel> => {
    return fetchApi({
      config: {
        url: `${urls.LABEL}/${labelId}`,
        method: 'PATCH',
        data,
      },
    });
  },
};

export default LabelApi;
