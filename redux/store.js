import {createStore}   from "redux";
import {createWrapper} from "next-redux-wrapper";
import rootReducer     from "./reducers/RootReducer";
const {persistStore, persistReducer} = require("redux-persist");
import storage from "redux-persist/lib/storage";
import Config          from "../config";

const persistConfig = {
    key: Config.STORE_NAME,
    storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

const store = createStore(persistedReducer); // Creating the store again

export const persistor = persistStore(store);

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export default store