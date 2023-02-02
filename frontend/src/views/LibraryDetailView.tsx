import { Button, Col, Divider, Pagination, Row, Typography } from 'antd'
import { chunk } from 'lodash-es'
import { ReactElement, useState } from 'react'
import { useParams } from 'react-router-dom'
import { scanManga, useAllMangas } from '../api'
import Loading from '../components/Loading'
import MangaCard from '../components/MangaCard'

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
  const [pageSize, setPageSize] = useState(20)
  const [scanError, setScanError] = useState<unknown>(null)
  const { data, error, isLoading } = useAllMangas(libraryId, current, pageSize)

  if (scanError) {
    throw scanError
  }
  if (error) {
    throw error
  }
  if (isLoading) {
    return <Loading />
  }
  if (!data) {
    throw new Error('null or undefined data')
  }
  const mangas = data.content
  const total = data.totalElements

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
        onClick={() => scanManga(libraryId).catch(setScanError)}
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
