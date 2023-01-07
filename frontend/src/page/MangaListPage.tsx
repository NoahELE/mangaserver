import { Col, Row, Typography } from 'antd'
import { chunk } from 'lodash-es'
import { ReactElement, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import api, { Manga } from '../api'
import MangaCard from './MangaCard'

const { Title } = Typography

export default function MangaListPage(): ReactElement {
  // parse libraryId from url params
  const { libraryId: libraryIdString } = useParams()
  if (libraryIdString === undefined || libraryIdString.length === 0) {
    throw json({
      msg: 'libraryId does not exist',
    })
  }
  const libraryId = +libraryIdString
  if (isNaN(libraryId)) {
    throw json({
      msg: 'libraryId is not a number',
    })
  }

  const [mangas, setMangas] = useState<Manga[]>([])
  api.getAllManga(libraryId).then(setMangas, (error) => {
    throw error
  })

  const mangaCards = chunk(mangas, 4).map((row, i) => (
    <Row key={i} gutter={16}>
      {row.map((manga, j) => (
        <Col key={`${i}-${j}`} span={6}>
          <MangaCard manga={manga} />
        </Col>
      ))}
    </Row>
  ))

  return (
    <>
      <Title>Manga List</Title>
      {...mangaCards}
    </>
  )
}
