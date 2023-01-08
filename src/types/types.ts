import type { ColumnsType } from 'antd/es/table';

//Requests//
export interface RequestProps {
  requests:
    | {
        header: ColumnsType<DataType>;
        main: DataType[];
      }
    | any;
  loading: boolean;
  error: string;
}

export interface DataType {
  key: string;
  latfrom: number;
  lngfrom: number;
  latto: number;
  lngto: number;
}

//Routes//

export interface RouteProps {
  coords: {
    lngfrom: null | number;
    latfrom: null | number;
    lngto: null | number;
    latto: null | number;
  };
  route: [number, number][] | null;
  loading: boolean;
  error: string;
}

export interface RoutePropsAction extends RouteProps {
  payload: Coords;
  type: string;
}

export interface IChangeView {
  markers: {
    lat: null | number;
    lon: null | number;
  }[];
}

export interface Coords {
  key: string;
  lngfrom: null | number;
  latfrom: null | number;
  lngto: null | number;
  latto: null | number;
}
