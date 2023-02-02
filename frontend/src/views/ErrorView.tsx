import { Button, Typography } from 'antd'
import { CSSProperties, ReactElement } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

const { Title, Paragraph } = Typography

const style: CSSProperties = { margin: '20px 10px' }

export default function ErrorView(): ReactElement {
  const error = useRouteError() + ''
  const navigate = useNavigate()

  return (
    <>
      <Title style={style}>Error</Title>
      <Paragraph code copyable style={{ margin: 20 }}>
        {error}
      </Paragraph>
      <Button
        type="primary"
        onClick={() => navigate('/login', { replace: true })}
        style={style}
      >
        Login
      </Button>
      <Button type="default" onClick={() => navigate(-1)} style={style}>
        Return to Last Page
      </Button>
    </>
  )
}
