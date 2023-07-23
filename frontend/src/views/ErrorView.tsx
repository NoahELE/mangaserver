import { Button, Space, Typography } from 'antd';
import { type ReactElement } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function ErrorView(): ReactElement {
  const error = useRouteError();
  const navigate = useNavigate();
  const refreshOnClick = (): void => {
    navigate(0);
  };
  const loginOnClick = (): void => {
    navigate('/login', { replace: true });
  };
  const returnOnClick = (): void => {
    navigate(-1);
  };

  return (
    <Space direction="vertical" size="large">
      <Title>Error</Title>
      <Paragraph code copyable>
        {String(error)}
      </Paragraph>
      <Space>
        <Button type="primary" onClick={refreshOnClick}>
          Refresh
        </Button>
        <Button type="default" onClick={loginOnClick}>
          Login
        </Button>
        <Button type="default" onClick={returnOnClick}>
          Return to Last Page
        </Button>
      </Space>
    </Space>
  );
}
