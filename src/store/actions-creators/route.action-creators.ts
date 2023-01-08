import { Coords } from '../../types/types';
import { LOAD_ROUTE_LOADING, SET_COORDS } from '../actions/route.actions';

export const setCoords = (payload: Coords) => ({
  type: SET_COORDS,
  payload: payload,
});

export const loadRoute = (coord: string) => ({
  type: LOAD_ROUTE_LOADING,
  coord,
});
