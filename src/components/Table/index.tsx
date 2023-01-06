import React from 'react';

import styles from './index.module.scss';

import { Alert, Spin, Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  loadRoute,
  setCoords,
} from '../../store/actions-creators/route.action-creators';

const TableComponent: React.FC = () => {
  const { requests, loading, error } = useSelector(
    (state: RootState) => state.requests
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.table}>
      <Table
        rowSelection={{
          type: 'radio',
          onSelect: (record) => {
            dispatch(setCoords(record));
            dispatch(loadRoute(record));
          },
        }}
        columns={requests.header}
        dataSource={requests.main}
        pagination={false}
        className={styles.table__inner}
      />
      {loading && <Spin size='large' className={styles.table__loader} />}
      {error && (
        <Alert message='Error' type='error' description={error} showIcon />
      )}
    </div>
  );
};

export default TableComponent;
