import { Button, Form, Input, Typography } from 'antd';
import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { type User } from '../entity';
import { useShowError } from '../utils';

const { Title } = Typography;

export default function LoginView(): ReactElement {
  const navigate = useNavigate();
  const showError = useShowError();
  const onFinish = (user: User): void => {
    login(user)
      .then((jwt) => {
        localStorage.setItem('jwt', jwt);
        navigate('/');
      })
      .catch((error: Error) => {
        showError(error);
      });
  };

  return (
    <>
      <Title className="my-10 mx-32 text-center">MangaServer</Title>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        className="my-10 mx-32"
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
