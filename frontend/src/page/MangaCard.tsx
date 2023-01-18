import { Card, Spin } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMangaPage } from '../api'
import { Manga } from '../entity'

const { Meta } = Card

interface Props {
  manga: Manga
}

export default function MangaCard({ manga }: Props): ReactElement {
  const { id, name, path } = manga
  const navigate = useNavigate()
  const [cover, setCover] = useState<string | null>(null)
  useEffect(() => {
    getMangaPage(manga.id, 0).then(setCover)
  }, [manga.id])

  return (
    <Card
      hoverable
      onClick={() => navigate(`/manga/${id}`)}
      cover={cover === null ? <Spin /> : <img src={cover} />}
    >
      <Meta title={name} description={path} />
    </Card>
  )
}
