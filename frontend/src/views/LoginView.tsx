import { Button, Form, Input, Typography } from 'antd'
import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import { User } from '../entity'
import useStore from '../store'

const { Title } = Typography

export default function LoginView(): ReactElement {
  const navigate = useNavigate()
  const setJwt = useStore((state) => state.setJwt)
  const [error, setError] = useState<unknown>(null)
  if (error !== null) {
    throw error
  }

  return (
    <>
      <Title style={{ textAlign: 'center', margin: '100px 0' }}>
        MangaServer
      </Title>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onFinish={(user: User): void => {
          login(user)
            .then((jwt) => {
              setJwt(jwt)
              navigate('/')
            })
            .catch(setError)
        }}
        style={{ margin: '0 400px' }}
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
  )
}
