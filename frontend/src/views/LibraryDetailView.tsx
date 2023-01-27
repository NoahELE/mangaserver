import { Button, Col, Divider, Pagination, Row, Typography } from 'antd'
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
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [mangas, setMangas] = useState<Manga[]>([])
  const [error, setError] = useState<unknown>(null)

  if (error !== null) {
    throw error
  }
  useEffect(() => {
    getAllMangas(libraryId, current, pageSize)
      .then((mangaPage) => {
        setMangas(mangaPage.content)
        setTotal(mangaPage.totalElements)
      })
      .catch(setError)
  }, [current, libraryId, pageSize])

  const mangaCards = chunk(mangas, 4).map((row) =>
    row.map((manga) => (
      <Col span={4} key={manga.id}>
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

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          current={current}
          total={total}
          showTotal={(total, [start, end]) =>
            `${start}-${end} of ${total} items`
          }
          pageSize={pageSize}
          showSizeChanger
          onChange={(page, pageSize) => {
            setCurrent(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )
}
