import { ICardList } from '@/interfaces/ICardList';
import { TReturn } from '@/interfaces/api';
import { ICardModel } from '@/interfaces/api/card';
import fetchApi from './fetch';
import urls from './config/urls';

const CardApi = {
  dragCard: (list: ICardList): TReturn<ICardList> => {
    return fetchApi<ICardList>({
      url: urls.CARD,
      method: 'PATCH',
      data: { list },
    });
  },
  addCard: (columnId: string, content: string): TReturn<ICardModel> => {
    return fetchApi({
      url: urls.CARD,
      method: 'POST',
      data: {
        columnId,
        content,
      },
    });
  },
};

export default CardApi;
