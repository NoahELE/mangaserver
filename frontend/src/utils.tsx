import { Button, notification } from 'antd';
import { useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type ErrorCallback = (error: Error) => void;

export function useErrorNotification(): [ErrorCallback, ReactElement] {
  const key = `error-${Date.now()}`;
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const closeOnClick = useCallback(() => {
    api.destroy(key);
  }, [api, key]);
  const refreshOnClick = useCallback(() => {
    location.reload();
  }, []);
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
      description: `An error occurred.\n\n ${error.name}\n${error.message}`,
      btn,
      key,
    });
  };

  return [showError, contextHolder];
}
