import styles from './index.module.scss';

import { Footer } from 'antd/es/layout/layout';
import { Wrapper } from '../Wrapper';

const PageFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <Wrapper>
        <p className={styles.footer__copyrights}>
          ©2023 KondakovAl. TestTask for ILS.
        </p>
      </Wrapper>
    </Footer>
  );
};

export default PageFooter;
