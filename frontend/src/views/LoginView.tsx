import { Button, Form, Input, Typography } from 'antd';
import { useSetAtom } from 'jotai';
import { useCallback, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { type User } from '../entity';
import { jwtAtom } from '../store';

const { Title } = Typography;

export default function LoginView(): ReactElement {
  const navigate = useNavigate();
  const setJwt = useSetAtom(jwtAtom);
  const [error, setError] = useState<Error | null>(null);
  const onFinish = useCallback(
    (user: User) => {
      login(user)
        .then((jwt) => {
          setJwt(jwt);
          navigate('/', { replace: true });
        })
        .catch((error) => {
          setError(error);
        });
    },
    [navigate, setJwt]
  );
  if (error != null) {
    throw error;
  }

  return (
    <>
      <Title className="my-20 text-center">MangaServer</Title>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        className="mx-60"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'please input your username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'please input your password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
