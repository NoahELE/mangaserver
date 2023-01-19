import { Col, Divider, Row, Typography } from 'antd'
import { chunk } from 'lodash-es'
import { ReactElement, useEffect, useState } from 'react'
import { getAllLibraries } from '../api'
import { Library } from '../entity'
import LibraryCard from './LibraryCard'

const { Title } = Typography

export default function LibraryListPage(): ReactElement {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [error, setError] = useState<unknown>(null)
  if (error !== null) {
    throw error
  }
  useEffect(() => {
    getAllLibraries().then(setLibraries).catch(setError)
  }, [])

  const libraryCards = chunk(libraries, 4).map((row) =>
    row.map((library) => (
      <Col span={6} key={library.id}>
        <LibraryCard library={library} />
      </Col>
    ))
  )

  return (
    <>
      <Title>Library List</Title>

      <Divider />

      <Row gutter={[16, 16]}>{...libraryCards}</Row>
    </>
  )
}
