import { RouteProps, RoutePropsAction } from '../../types/types';

import {
  LOAD_ROUTE_ERROR,
  LOAD_ROUTE_LOADING,
  LOAD_ROUTE_SUCCESS,
  SET_COORDS,
} from '../actions/route.actions';

const initialState = {
  coords: {
    lngfrom: null,
    latfrom: null,
    lngto: null,
    latto: null,
  },
  route: null,
  loading: false,
  error: '',
};

const setRoute = (state: RouteProps, action: RoutePropsAction) => {
  const polyline = require('@mapbox/polyline');
  const decodedRoute = polyline.decode(action.route);

  return {
    ...state,
    route: decodedRoute,
    loading: false,
  };
};

export const routeReducer = (
  state: RouteProps = initialState,
  action: RoutePropsAction
) => {
  switch (action.type) {
    case SET_COORDS: {
      return {
        ...state,
        coords: {
          lngfrom: action.payload.lngfrom,
          latfrom: action.payload.latfrom,
          lngto: action.payload.lngto,
          latto: action.payload.latto,
        },
      };
    }
    case LOAD_ROUTE_LOADING: {
      return {
        ...state,
        loading: true,
        route: null,
        error: '',
      };
    }
    case LOAD_ROUTE_SUCCESS: {
      return setRoute(state, action);
    }
    case LOAD_ROUTE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
