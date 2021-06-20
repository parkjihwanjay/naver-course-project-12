/* eslint-disable no-param-reassign */
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { TResult, TError } from '@/interfaces/api';
import { getJwtTokenHeader } from '@/utils';

const defaultUrl = process.env.NEXT_PUBLIC_SEVER_ADDRESS || '/api';
axios.defaults.baseURL = defaultUrl;

const makeRequest = <T>(config: AxiosRequestConfig): AxiosPromise<T> => {
  return axios(config);
};
const fetchApi = async <T>({ config, isAuth = true }: { config: AxiosRequestConfig; isAuth?: boolean }): Promise<[TResult<T>, TError]> => {
  if (isAuth) config = { ...config, headers: getJwtTokenHeader() };
  try {
    const { data, status } = await makeRequest<T>(config);
    if (status === 400) throw new Error();
    return [data, null];
  } catch (e) {
    return [null, e];
  }
};

export default fetchApi;
