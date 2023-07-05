import { Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getMangaPage } from '../api';
import { Manga } from '../entity';

const { Text } = Typography;

interface Props {
  manga: Manga;
  pageIndex: number;
}

export default function MangaPageImage({
  manga: { id, numOfPages },
  pageIndex,
}: Props) {
  const [page, setPage] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);
  if (error !== null) {
    throw error;
  }
  useEffect(() => {
    getMangaPage(id, 0)
      .then((page) => setPage(URL.createObjectURL(page)))
      .catch((error) => setError(error));
    return () => {
      if (page !== null) {
        URL.revokeObjectURL(page);
      }
    };
  }, [page, id]);

  if (page === null) {
    return <Spin />;
  } else {
    return (
      <>
        <img alt={`page ${pageIndex}`} src={page} width="75%" />
        <Text type="secondary">
          {pageIndex + 1} / {numOfPages}
        </Text>
      </>
    );
  }
}
