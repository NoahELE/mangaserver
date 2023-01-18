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

  const libraryCards = chunk(libraries, 4).map((row, i) => (
    <Row key={i} gutter={16}>
      {row.map((library, j) => (
        <Col key={`${i}-${j}`} span={6}>
          <LibraryCard library={library} />
        </Col>
      ))}
    </Row>
  ))

  return (
    <>
      <Title>Library List</Title>

      <Divider />

      {...libraryCards}
    </>
  )
}
