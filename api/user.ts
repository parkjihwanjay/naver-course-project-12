import { TReturn } from '@/interfaces/api';

import fetchApi from './fetch';
import urls from './config/urls';

interface TNaverProfile {
  user: {
    email: string;
    id: string;
  };
  jwtToken: string;
}

const UserApi = {
  getNaverProfile: (token: string): TReturn<TNaverProfile> => {
    return fetchApi({
      config: {
        url: urls.USER.NAVER,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
      isAuth: false,
    });
  },
};

export default UserApi;
