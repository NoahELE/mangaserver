import { Button, Typography } from 'antd';
import { ReactElement, useCallback } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function ErrorView(): ReactElement {
  const error = useRouteError();
  const navigate /* eslint-env node */ = useNavigate();
  const loginOnClick = useCallback(
    () => navigate('/login', { replace: true }),
    [navigate]
  );
  const returnOnClick = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <Title className="mx-5 my-10">Error</Title>
      <Paragraph code copyable className="mx-5 my-10">
        {JSON.stringify(error)}
      </Paragraph>
      <Button type="primary" onClick={loginOnClick} className="mx-5 my-10">
        Login
      </Button>
      <Button type="default" onClick={returnOnClick} className="mx-5 my-10">
        Return to Last Page
      </Button>
    </>
  );
}
