import { Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getMangaPage } from '../api';
import { Manga } from '../entity';

const { Text } = Typography;

interface Props {
  manga: Manga;
  pageId: number;
}

export default function MangaPageImage({
  manga: { id: mangaId, numOfPages },
  pageId,
}: Props) {
  const [page, setPage] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);
  if (error !== null) {
    throw error;
  }
  useEffect(() => {
    getMangaPage(mangaId, pageId)
      .then((page) => setPage(page))
      .catch((error) => setError(error));
  }, [mangaId, pageId]);

  if (page === null) {
    return <Spin />;
  } else {
    return (
      <>
        <img alt={`page ${pageId}`} src={page} width="75%" />
        <Text type="secondary">
          {pageId + 1} / {numOfPages}
        </Text>
      </>
    );
  }
}
