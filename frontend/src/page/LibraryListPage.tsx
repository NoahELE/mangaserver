import { Col, Row, Typography } from 'antd'
import { chunk } from 'lodash-es'
import { ReactElement, useEffect, useState } from 'react'
import api, { Library } from '../api'
import LibraryCard from './LibraryCard'

const { Title } = Typography

export default function LibraryListPage(): ReactElement {
  const [libraries, setLibraries] = useState<Library[]>([])

  useEffect(() => {
    api.getAllLibraries().then(setLibraries, (error) => {
      throw error
    })
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
  //   : ReactElement[] = []
  // for (let i = 0; i < Math.ceil(libraries.length / 4); i++) {
  //   const row: ReactElement[] = []

  //   for (let j = 0; j < 4; j++) {
  //     const index = i * 4 + j

  //     if (index >= libraries.length) {
  //       break
  //     }

  //     const library = libraries[index]
  //     row.push(
  //       <Col key={`${i}-${j}`} span={6}>
  //         <LibraryCard library={library} />
  //       </Col>
  //     )
  //   }

  //   libraryCards.push(
  //     <Row key={i} gutter={16}>
  //       {...row}
  //     </Row>
  //   )
  // }

  return (
    <>
      <Title>Library List</Title>
      {...libraryCards}
    </>
  )
}
