import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

export const types = {
  UPDATESTATE: 'UPDATESTATE',
};

const initialState = {
  timer: '00:00.000',
  laps: [],
};

const updateState = (state, change) => ({
  ...state,
  [change.key]: change.value,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['laps'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATESTATE:
      return updateState(state, action.change);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer: persistReducer(persistConfig, reducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
