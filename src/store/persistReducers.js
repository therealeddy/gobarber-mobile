import AsyncStorage from '@react-native-community/async-storage';

import { persistReducer } from 'redux-persist';

const nameReducer = process.env.REACT_APP_PERSIST_REDUCER || 'root';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: nameReducer,
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
  return persistedReducer;
};
