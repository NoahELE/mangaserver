import { Spin, Typography } from 'antd';
import { useEffect, useState, type ReactElement } from 'react';
import { getMangaPage } from '../api';
import { type Manga } from '../entity';

const { Text } = Typography;

interface Props {
  manga: Manga;
  pageIndex: number;
}

/**
 * custom hook to fetch manga page and create corresponding object url
 * @param mangaId the id of the manga
 * @param pageIndex the index of the page
 * @returns the created object url of the manga page
 */
function useMangaPage(mangaId: number, pageIndex: number): string | null {
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let url: string | null = null;
    getMangaPage(mangaId, pageIndex)
      .then((page) => {
        url = URL.createObjectURL(page);
        setPageUrl(url);
      })
      .catch((error: Error) => {
        setError(error);
      });
    return () => {
      if (url != null) {
        URL.revokeObjectURL(url);
      }
    };
  }, [mangaId, pageIndex]);
  if (error != null) {
    throw error;
  }
  return pageUrl;
}

export default function MangaPageImage({
  manga,
  pageIndex,
}: Props): ReactElement {
  const pageUrl = useMangaPage(manga.id, pageIndex);

  if (pageUrl == null) {
    return <Spin />;
  } else {
    return (
      <>
        <img src={pageUrl} alt={`page ${pageIndex}`} width="75%" />
        <Text type="secondary">
          {pageIndex + 1} / {manga.numOfPages}
        </Text>
      </>
    );
  }
}
