import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { requestsReducer } from './reducers/requests.reducer';
import createSagaMiddleware from 'redux-saga';

import { rootWatcher } from '../sagas';
import { routeReducer } from './reducers/route.reducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  requests: requestsReducer,
  route: routeReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
