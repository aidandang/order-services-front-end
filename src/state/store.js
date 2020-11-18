import { createStore, applyMiddleware } from "redux";
import { persistStore} from 'redux-persist';

// middlewares
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// root reducer
import rootReducer from './root-reducer';

const middlewares = [thunk];

// only add logger middleware in develpopment environment
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };


