import { Button, Typography } from 'antd'
import { ReactElement } from 'react'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

const { Title, Text } = Typography

export default function ErrorPage(): ReactElement {
  const error = useRouteError()
  const navigate = useNavigate()

  let msg: string
  if (isRouteErrorResponse(error)) {
    msg = error.data.msg + ''
  } else {
    msg = error + ''
  }

  return (
    <>
      <Title>Error</Title>
      <Text>{msg}</Text>
      <Button type="primary" onClick={() => navigate(-1)}>
        Return to Last Page
      </Button>
      <Button type="default" onClick={() => navigate('/login')}>
        Login
      </Button>
    </>
  )
}
