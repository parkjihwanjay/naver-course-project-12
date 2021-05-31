import { ICardList } from '@/interfaces/ICardList';
import { TReturn } from '@/interfaces/api';
import fetchApi from './fetch';
import urls from './config/urls';

const CardListApi = {
  getCardList: (): TReturn<ICardList> => {
    return fetchApi<ICardList>({
      url: urls.CARD_LIST,
      method: 'GET',
    });
  },
};

export default CardListApi;
