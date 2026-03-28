import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//  Import your reducers
import authReducer from '@/redux/features/auth/authSlice';

import { baseApi } from '@/redux/api/baseApi'; // optional if you use RTK Query
import { aiApi } from '@/redux/features/dailyLeads/dailyLeads'; // AI API

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

//  Combine reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer, // optional for RTK Query
  [aiApi.reducerPath]: aiApi.reducer, // AI API
  auth: authReducer,
});

//  Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, aiApi.middleware), // Add both middlewares
});

export default store;

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
