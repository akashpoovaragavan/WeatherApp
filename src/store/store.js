import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import Api from '../api_services/api';

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware();
export const Store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }).concat(Api.middleware, immutableInvariantMiddleware),
});
setupListeners(Store.dispatch);
export default Store;
