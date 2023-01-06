import { all } from 'redux-saga/effects';
import { requestsWather } from './requestsSaga';
import { routeWatcher } from './routeSaga';

export function* rootWatcher() {
  yield all([requestsWather(), routeWatcher()]);
}
