import { Button, Form, Input, Typography } from 'antd';
import { useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { type User } from '../entity';
import styles from './LoginView.module.css';

const { Title } = Typography;

export default function LoginView(): ReactElement {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);
  const onFinish = (user: User): void => {
    login(user)
      .then((jwt) => {
        localStorage.setItem('jwt', jwt);
        navigate('/', { replace: true });
      })
      .catch((error: Error) => {
        setError(error);
      });
  };
  if (error != null) {
    throw error;
  }

  return (
    <>
      <Title className={styles.title}>MangaServer</Title>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        className={styles.form}
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
