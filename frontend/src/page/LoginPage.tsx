import { Button, Form, Input, Typography } from 'antd'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { User } from '../api'
import useStore from '../store'

const { Title } = Typography

export default function LoginPage(): ReactElement {
  const setJwt = useStore((state) => state.setJwt)
  const navigate = useNavigate()

  const handleFinish = (user: User): void => {
    api.login(user).then(
      (jwt) => {
        setJwt(jwt)
        navigate('/')
      },
      (error) => {
        throw error
      }
    )
  }
  const handleFinishFailed = (error: ValidateErrorEntity<User>) => {
    throw error
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
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
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
