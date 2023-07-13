import { Button, notification, Typography } from 'antd';
import { useCallback, useId, type ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { Paragraph } = Typography;

type ErrorCallback = (error: Error) => void;

export function useErrorNotification(): [ErrorCallback, ReactElement] {
  const key = useId();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const closeOnClick = useCallback(() => {
    api.destroy(key);
  }, [api, key]);
  const refreshOnClick = useCallback(() => {
    navigate(0);
  }, [navigate]);
  const loginOnClick = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const btn = (
    <>
      <Button type="primary" onClick={closeOnClick}>
        Close
      </Button>
      <Button type="link" onClick={refreshOnClick}>
        Refresh
      </Button>
      <Button type="link" onClick={loginOnClick}>
        Login
      </Button>
    </>
  );

  const showError: ErrorCallback = (error) => {
    api.error({
      message: 'Error',
      description: (
        <>
          <Paragraph>An error occurred.</Paragraph>
          <Paragraph>
            ${error.name} - ${error.message}
          </Paragraph>
        </>
      ),
      btn,
      key,
    });
  };

  return [showError, contextHolder];
}

export function useParamsId(param: string): number {
  const idString = useParams()[param];
  if (idString == null) {
    throw new Error(`param ${param} does not exist`);
  }
  const id = parseInt(idString);
  if (isNaN(id)) {
    throw new Error(`param ${param} is not a number`);
  }
  return id;
}
