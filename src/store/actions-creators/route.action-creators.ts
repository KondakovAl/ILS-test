import { LOAD_ROUTE_LOADING, SET_COORDS } from '../actions/route.actions';

export const setCoords = (payload: any) => ({
  type: SET_COORDS,
  payload: payload,
});

export const loadRoute = (coord: any) => ({
  type: LOAD_ROUTE_LOADING,
  coord,
});
