import { createStore, combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import countReducer from './reducers/customReducer';
import { persistStore, persistReducer } from 'redux-persist'
import secretCodeReducer from "./reducers/secretCodeReducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

const rootReducer = combineReducers(

  {
      count: countReducer,
      secretCode: secretCodeReducer,
  }

);

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }


  