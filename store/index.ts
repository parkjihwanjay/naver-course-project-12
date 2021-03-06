import { configureStore } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'redux-logger';
import { boardReducer, editingReducer, userReducer, popReducer } from './modules';

const env = process.env.NODE_ENV;
const reducer = {
  board: boardReducer,
  editing: editingReducer,
  user: userReducer,
  pop: popReducer,
};

const middleware =
  env === 'production'
    ? {}
    : {
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
      };

const store = configureStore({
  reducer,
  ...middleware,
  devTools: env !== 'production',
  enhancers: [reduxBatch],
});

export default store;

// export type IRootState = ReturnType<typeof store.getState>;
export type { IRootState } from './modules/RootState';
export type ReduxDispatch = typeof store.dispatch;
