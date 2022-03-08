import {createStore} from "redux";
import rootReducer from "./reducers/RootReducer";
import storage from "redux-persist/lib/storage";
import Config from "../config";
import {persistStore, persistReducer} from "redux-persist";

const persistConfig = {
  key: Config.STORE_NAME,
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
