import { Card } from 'antd'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Manga } from '../api'

interface Props {
  manga: Manga
}

export default function MangaCard({ manga }: Props): ReactElement {
  const { id, name, path } = manga
  const navigate = useNavigate()
  const handleClick = () => navigate(`/manga/${id}`)
  return (
    <Card
      hoverable
      onClick={handleClick}
      cover={<img alt="manga cover" src={`/api/manga/${id}/page/0`} />}
    >
      <Card.Meta title={name} description={path} />
    </Card>
  )
}
