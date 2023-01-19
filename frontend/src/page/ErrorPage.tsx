import { Button, Typography } from 'antd'
import { AxiosError } from 'axios'
import { CSSProperties, ReactElement } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

const { Title, Paragraph } = Typography

const style: CSSProperties = { margin: '20px 10px' }

export default function ErrorPage(): ReactElement {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMsg: string
  if (error instanceof AxiosError && error.response) {
    errorMsg = `${error.name}\n${error.message}\n${error.response.status}\n${error.response.statusText}`
  }
  if (error instanceof Error) {
    errorMsg = `${error.name}\n${error.message}`
  } else {
    errorMsg = error + ''
  }

  return (
    <>
      <Title style={style}>Error</Title>
      <Paragraph code copyable style={{ margin: 20 }}>
        {errorMsg}
      </Paragraph>
      <Button type="primary" onClick={() => navigate('/login')} style={style}>
        Login
      </Button>
      <Button type="default" onClick={() => navigate(-1)} style={style}>
        Return to Last Page
      </Button>
    </>
  )
}
