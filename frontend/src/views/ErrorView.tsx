import { Button, Typography } from 'antd';
import { ReactElement } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function ErrorView(): ReactElement {
  const error = String(useRouteError());
  const navigate /* eslint-env node */ = useNavigate();

  return (
    <>
      <Title className="my-10">Error</Title>
      <Paragraph code copyable className="my-10">
        {error}
      </Paragraph>
      <Button
        type="primary"
        onClick={() => navigate('/login', { replace: true })}
        className="my-10 mr-10"
      >
        Login
      </Button>
      <Button type="default" onClick={() => navigate(-1)} className="my-10">
        Return to Last Page
      </Button>
    </>
  );
}
