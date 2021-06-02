import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { TResult, TError } from '@/interfaces/api';

const defaultUrl = process.env.NEXT_PUBLIC_SEVER_ADDRESS;
axios.defaults.baseURL = defaultUrl;

const makeRequest = <T>(config: AxiosRequestConfig): AxiosPromise<T> => {
  return axios(config);
};

const fetchApi = async <T>(config: AxiosRequestConfig): Promise<[TResult<T>, TError]> => {
  try {
    const { data } = await makeRequest<T>(config);
    return [data, null];
  } catch (e) {
    return [null, e];
  }
};
export default fetchApi;
