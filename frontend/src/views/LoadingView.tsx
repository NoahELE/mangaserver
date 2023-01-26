import { Spin } from 'antd'
import { ReactElement } from 'react'

export default function LoadingView(): ReactElement {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  )
}
