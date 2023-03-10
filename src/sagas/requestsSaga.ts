import { put, takeEvery } from 'redux-saga/effects';
import { GIST_API } from '../constants/global';

import {
  LOAD_REQUESTS_ERROR,
  LOAD_REQUESTS_LOADING,
  LOAD_REQUESTS_SUCCESS,
} from '../store/actions/requests.actions';

const fetchRequests = async () => {
  const response = await fetch(
    `${GIST_API}93b50d9cc27fb219bf8368aca0e461fa/raw/4207612ca35fd5cc1551dd93b672473c3a5a1518/table_ILS.json`
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Unexpected error!!!');
};

function* fetchRequestsWorker(): any {
  try {
    const requests = yield fetchRequests();

    yield put({ type: LOAD_REQUESTS_SUCCESS, requests: requests });
  } catch (error: any) {
    yield put({ type: LOAD_REQUESTS_ERROR, error: error.message });
  }
}

export function* requestsWather() {
  yield takeEvery(LOAD_REQUESTS_LOADING, fetchRequestsWorker);
}
