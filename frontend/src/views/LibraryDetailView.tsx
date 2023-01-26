import { Button, Col, Divider, Row, Typography } from 'antd'
import { chunk } from 'lodash-es'
import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllMangas, scanManga } from '../api'
import MangaCard from '../components/MangaCard'
import { Manga } from '../entity'

const { Title } = Typography

export default function LibraryDetailView(): ReactElement {
  // parse libraryId from url
  const { libraryId: libraryIdString } = useParams()
  if (libraryIdString === undefined) {
    throw new Error('libraryId does not exist')
  }
  const libraryId = +libraryIdString
  if (isNaN(libraryId)) {
    throw new Error('libraryId is not a number')
  }

  // get manga list from api
  const [mangas, setMangas] = useState<Manga[]>([])
  const [error, setError] = useState<unknown>(null)
  if (error !== null) {
    throw error
  }
  useEffect(() => {
    getAllMangas(libraryId).then(setMangas).catch(setError)
  }, [libraryId])

  const mangaCards = chunk(mangas, 4).map((row) =>
    row.map((manga) => (
      <Col span={6} key={manga.id}>
        <MangaCard manga={manga} />
      </Col>
    ))
  )

  return (
    <>
      <Title>Manga List</Title>
      <Button
        type="default"
        onClick={() => scanManga(libraryId).catch(setError)}
      >
        Scan Manga
      </Button>

      <Divider />

      <Row gutter={[16, 16]}>{...mangaCards}</Row>
    </>
  )
}
