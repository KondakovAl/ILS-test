import styles from './index.module.scss';

import { Header } from 'antd/es/layout/layout';
import { Wrapper } from '../Wrapper';
import logo from '../../assets/images/logo.png';

const PageHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <Wrapper>
        <div className={styles.header__logo}>
          <img src={logo} alt='IlS logo' />
        </div>
      </Wrapper>
    </Header>
  );
};

export default PageHeader;
