import { Col, Divider, Pagination, Row, Typography } from 'antd'
import { chunk } from 'lodash-es'
import { ReactElement, useEffect, useState } from 'react'
import { getAllLibraries } from '../api'
import LibraryCard from '../components/LibraryCard'
import { Library } from '../entity'

const { Title } = Typography

export default function LibraryListView(): ReactElement {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [libraries, setLibraries] = useState<Library[]>([])
  const [error, setError] = useState<unknown>(null)

  if (error !== null) {
    throw error
  }
  useEffect(() => {
    getAllLibraries(current, 20)
      .then((libraryPage) => {
        setLibraries(libraryPage.content)
        setTotal(libraryPage.totalElements)
      })
      .catch(setError)
  }, [current])

  const libraryCards = chunk(libraries, 4).map((row) =>
    row.map((library) => (
      <Col span={4} key={library.id}>
        <LibraryCard library={library} />
      </Col>
    ))
  )

  return (
    <>
      <Title>Library List</Title>

      <Divider />

      <Row gutter={[16, 16]}>{...libraryCards}</Row>

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
