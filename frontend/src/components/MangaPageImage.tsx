import { Image, Spin, Typography } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { getMangaPage } from '../api'
import { Manga } from '../entity'

const { Text } = Typography

interface Props {
  manga: Manga
  pageId: number
}

export default function MangaPageImage({ manga, pageId }: Props): ReactElement {
  const [page, setPage] = useState<string | null>(null)
  const [error, setError] = useState<unknown>(null)
  if (error !== null) {
    throw error
  }
  useEffect(() => {
    getMangaPage(manga.id, pageId).then(setPage).catch(setError)
  }, [manga.id, pageId])

  if (page === null) {
    return <Spin />
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          alt={`page ${pageId}`}
          src={page}
          width="75%"
          preview={false}
          placeholder
        />
        <Text type="secondary">
          {pageId + 1}/{manga.numOfPages}
        </Text>
      </div>
    )
  }
}
