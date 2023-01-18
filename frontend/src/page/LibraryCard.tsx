import { Card } from 'antd'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Library } from '../entity'

interface Props {
  library: Library
}

export default function LibraryCard({
  library: { id, name, path },
}: Props): ReactElement {
  const navigate = useNavigate()

  return (
    <Card title={name} hoverable onClick={() => navigate(`/library/${id}`)}>
      {path}
    </Card>
  )
}
