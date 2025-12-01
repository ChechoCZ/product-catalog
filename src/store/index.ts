import { configureStore } from '@reduxjs/toolkit';

import createProductModalReducer from './slices/create-product-modal-slice';
import filtersReducer from './slices/filters-slice';
import authReducer from './slices/auth-slice';
import { productApi } from './api/product';

export const store = configureStore({
  reducer: {
    createProductModal: createProductModalReducer,
    filters: filtersReducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
