import { Spin, Typography } from 'antd';
import { type ReactElement } from 'react';
import { type Manga } from '../entity';
import { useMangaPage } from '../utils';

const { Text } = Typography;

interface Props {
  manga: Manga;
  pageIndex: number;
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
