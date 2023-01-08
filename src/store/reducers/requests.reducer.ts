import { ColumnsType } from 'antd/es/table';

import { DataType, RequestProps } from '../../types/types';
import {
  LOAD_REQUESTS_ERROR,
  LOAD_REQUESTS_LOADING,
  LOAD_REQUESTS_SUCCESS,
} from '../actions/requests.actions';

const initialState = {
  requests: [],
  loading: false,
  error: '',
};

interface RequestsActionsProps {
  requests: {
    header: ColumnsType<DataType>;
    main: DataType[];
  };
  error: string;
  type: string;
}

export const requestsReducer = (
  state: RequestProps = initialState,
  action: RequestsActionsProps
) => {
  switch (action.type) {
    case LOAD_REQUESTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case LOAD_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: action.requests,
        loading: false,
      };
    }
    case LOAD_REQUESTS_ERROR: {
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
