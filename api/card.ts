import { ICardList } from '@/interfaces/ICardList';
import { TReturn } from '@/interfaces/api';
import { dragCardDTO } from '@/interfaces/api/card';
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
};

export default CardApi;
