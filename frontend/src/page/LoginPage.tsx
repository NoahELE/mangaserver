import { Button, Form, Input, Typography } from 'antd'
import { ReactElement } from 'react'
import { api, User } from '../request'
import { useStore } from '../store'

const { Title } = Typography

export default function LoginPage(): ReactElement {
  const setJwt = useStore((state) => state.setJwt)

  const onFinish = async (user: User) => {
    try {
      const jwt = await api.login(user)
      setJwt(jwt)
      location.assign('/')
    } catch (error) {
      alert(error)
      location.assign('/login')
    }
  }

  return (
    <>
      <Title
        style={{
          textAlign: 'center',
          marginTop: 100,
        }}
      >
        MangaServer
      </Title>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={alert}
        style={{
          marginLeft: 500,
          marginRight: 500,
        }}
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
