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
import storage from "redux-persist/lib/storage"; // usa localStorage
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import listingReducer from "./listing/listingSlice";
import reviewReducer from "./review/reviewSlice";
import alertReducer from "./alert/alertSlice";
import imageReducer from "./image/imageSlice";
import chatReducer from "./chat/chatSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  listing: listingReducer,
  review: reviewReducer,
  alert: alertReducer,
  image: imageReducer,
  chat: chatReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
