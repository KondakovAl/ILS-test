import Table from './components/Table';
import Map from './components/Map';

import './assets/scss/index.scss';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequests } from './store/actions-creators/requests.action-creators';
import { RootState } from './store';
import { Wrapper } from './components/Wrapper';
import Header from './components/PageHeader';
import Footer from './components/PageFooter';

const App = () => {
  const requests = useSelector((state: RootState) => state.route);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRequests());
  }, []);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  return (
    <Layout className='layout'>
      <Header />
      <Content className='layout__content'>
        <Wrapper className='content__wrapper'>
          <Table />
          <Map />
        </Wrapper>
      </Content>
      <Footer />
    </Layout>
  );
};

export default App;
