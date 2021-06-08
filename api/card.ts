import { ICardList } from '@/interfaces/ICardList';
import { TReturn } from '@/interfaces/api';
import { ICard } from '@/interfaces/ICard';
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
  addCard: (columnId: string, content: string): TReturn<ICard> => {
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
