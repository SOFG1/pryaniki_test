import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedUserReducer = persistReducer(
  {
    key: "user",
    storage,
  },
  userReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);


export type RootStateType = ReturnType<typeof store.getState>;
