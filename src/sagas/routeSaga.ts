import { put, takeEvery, call, delay } from 'redux-saga/effects';
import { OSRM_API } from '../constants/global';

import {
  LOAD_ROUTE_ERROR,
  LOAD_ROUTE_LOADING,
  LOAD_ROUTE_SUCCESS,
} from '../store/actions/route.actions';

import { Coords } from '../types/types';

export const fetchRoute = async (coord: Coords) => {
  const { lngfrom, latfrom, lngto, latto } = coord;
  const response = await fetch(
    `${OSRM_API}route/v1/driving/${lngfrom},${latfrom};${lngto},${latto}?overview=full`
  );

  if (response.ok) {
    const res = await response.json();
    return res.routes[0].geometry;
  }
  throw new Error('Unexpected error!!!');
};

function* routeWorker(action: any): any {
  yield delay(500);
  try {
    const route = yield call(fetchRoute, action.coord);
    yield put({ type: LOAD_ROUTE_SUCCESS, route: route });
  } catch (error: any) {
    yield put({ type: LOAD_ROUTE_ERROR, error: error.message });
  }
}

export function* routeWatcher() {
  yield takeEvery(LOAD_ROUTE_LOADING, routeWorker);
}
