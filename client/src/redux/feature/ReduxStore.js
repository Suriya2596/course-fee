import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthSlice from "../feature/userAuth/userAuthSlice"
import feesSlice from '../feature/fees/feesSlice'
import courseSlice from '../feature/course/courseSlice'

const rootReducer = combineReducers({
  userAuth: userAuthSlice,
  fees: feesSlice,
  course: courseSlice
});

// Configure persist settings
const persistConfig = {
  key: "newRoot",
  version: 3,
  storage,
  blacklist: [],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
