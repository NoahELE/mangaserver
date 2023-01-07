import { Card } from 'antd'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Library } from '../api'

interface Props {
  library: Library
}

export default function LibraryCard({ library }: Props): ReactElement {
  const { id, name, path } = library
  const navigate = useNavigate()
  const handleClick = () => navigate(`/library/${id}`)
  return (
    <Card hoverable onClick={handleClick}>
      <Card.Meta title={name} description={path} />
    </Card>
  )
}
