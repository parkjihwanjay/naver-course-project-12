import { TReturn } from '@/interfaces/api';
import fetchApi from './fetch';
import urls from './config/urls';
import { ICardInitial, IUpdateCard, ICardModel } from '../interfaces/ICard';

const CardApi = {
  getCardList: (): TReturn<ICardModel[]> => {
    return fetchApi({
      config: {
        url: urls.CARD,
        method: 'GET',
      },
    });
  },
  addCard: (listId: string, card: ICardInitial): TReturn<ICardModel> => {
    return fetchApi({
      config: {
        url: urls.CARD,
        method: 'POST',
        data: {
          listId,
          card,
        },
      },
    });
  },
  getCard: (cardId: string): TReturn<ICardModel> => {
    return fetchApi({
      config: {
        url: `${urls.CARD}/${cardId}`,
        method: 'get',
      },
    });
  },
  deleteCard: (cardId: string): TReturn<ICardModel> => {
    return fetchApi({
      config: {
        url: `${urls.CARD}/${cardId}`,
        method: 'DELETE',
      },
    });
  },
  updateCard: (cardId: string, data: IUpdateCard): TReturn<ICardModel> => {
    return fetchApi({
      config: {
        url: `${urls.CARD}/${cardId}`,
        method: 'PATCH',
        data,
      },
    });
  },
};

export default CardApi;
