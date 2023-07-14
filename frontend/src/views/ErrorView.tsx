import { Button, Typography } from 'antd';
import { useCallback, type ReactElement } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import styles from './ErrorView.module.css';

const { Title, Paragraph } = Typography;

export default function ErrorView(): ReactElement {
  const error = useRouteError();
  const navigate /* eslint-env node */ = useNavigate();
  const refreshOnClick = useCallback(() => {
    navigate(0);
  }, [navigate]);
  const loginOnClick = useCallback(() => {
    navigate('/login', { replace: true });
  }, [navigate]);
  const returnOnClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <Title className={styles.margin}>Error</Title>
      <Paragraph code copyable className={styles.margin}>
        {String(error)}
      </Paragraph>
      <Button type="primary" onClick={refreshOnClick} className={styles.margin}>
        Refresh
      </Button>
      <Button type="default" onClick={loginOnClick} className={styles.margin}>
        Login
      </Button>
      <Button type="default" onClick={returnOnClick} className={styles.margin}>
        Return to Last Page
      </Button>
    </>
  );
}
