export type { ColumnDTO } from './column';

export type TResult<T> = T | null;
export type TError = CustomError | null;
export type TReturn<T> = Promise<[TResult<T>, TError]>;

export interface CustomError extends Error {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}
