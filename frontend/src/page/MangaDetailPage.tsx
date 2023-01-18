import { Descriptions, Divider, Typography } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getManga } from '../api'
import { Manga } from '../entity'
import LoadingPage from './LoadingPage'
import MangaPageImage from './MangaPageImage'

const { Title } = Typography
const { Item } = Descriptions

export default function MangaDetailPage(): ReactElement {
  // parse mangaId from url
  const { mangaId: mangaIdString } = useParams()
  if (mangaIdString === undefined) {
    throw new Error('mangaId does not exist')
  }
  const mangaId = +mangaIdString
  if (isNaN(mangaId)) {
    throw new Error('mangaId is not a number')
  }

  // get manga from api
  const [manga, setManga] = useState<Manga | null>(null)
  const [error, setError] = useState<unknown>(null)
  if (error !== null) {
    throw error
  }
  useEffect(() => {
    getManga(mangaId).then(setManga).catch(setError)
  }, [mangaId])

  if (manga === null) {
    // full screen loading
    return <LoadingPage />
  } else {
    const pages: ReactElement[] = []
    for (let pageId = 0; pageId < manga.numOfPages; pageId++) {
      pages.push(
        <MangaPageImage mangaId={mangaId} pageId={pageId} key={pageId} />
      )
    }

    return (
      <>
        <Title>{manga.name}</Title>

        <Divider />

        <Descriptions bordered column={2}>
          <Item label="Name">{manga.name}</Item>
          <Item label="Path">{manga.path}</Item>
          <Item label="Ext">{manga.ext}</Item>
          <Item label="Number of Pages">{manga.numOfPages}</Item>
          <Item label="Library">{manga.library.name}</Item>
        </Descriptions>

        <Divider />

        {...pages}
      </>
    )
  }
}
