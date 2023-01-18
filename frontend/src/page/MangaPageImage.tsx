import { Image, Spin } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { getMangaPage } from '../api'

interface Props {
  mangaId: number
  pageId: number
}

export default function MangaPageImage({
  mangaId,
  pageId,
}: Props): ReactElement {
  const [page, setPage] = useState<string | null>(null)
  const [error, setError] = useState<unknown>(null)
  if (error !== null) {
    throw error
  }
  useEffect(() => {
    getMangaPage(mangaId, pageId).then(setPage).catch(setError)
  }, [mangaId, pageId])

  if (page === null) {
    return <Spin />
  } else {
    return (
      <Image
        alt={`page ${pageId}`}
        src={page}
        width="75%"
        preview={false}
        placeholder
      />
    )
  }
}
