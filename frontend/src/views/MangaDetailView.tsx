import { Descriptions, Divider, Typography } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getManga } from '../api';
import Loading from '../components/Loading';
import MangaPageImage from '../components/MangaPageImage';
import { Manga } from '../entity';

const { Title } = Typography;

export default function MangaDetailView(): ReactElement {
  // parse mangaId from url
  const { mangaId: mangaIdString } = useParams();
  if (mangaIdString === undefined) {
    throw new Error('mangaId does not exist');
  }
  const mangaId = +mangaIdString;
  if (isNaN(mangaId)) {
    throw new Error('mangaId is not a number');
  }

  // get manga from api
  const [manga, setManga] = useState<Manga | null>(null);
  const [error, setError] = useState<unknown>(null);

  if (error !== null) {
    throw error;
  }
  useEffect(() => {
    getManga(mangaId).then(setManga).catch(setError);
  }, [mangaId]);

  if (manga === null) {
    return <Loading />;
  } else {
    const pages: ReactElement[] = [];
    for (let pageId = 0; pageId < manga.numOfPages; pageId++) {
      pages.push(<MangaPageImage manga={manga} pageId={pageId} key={pageId} />);
    }

    return (
      <>
        <Title>{manga.name}</Title>

        <Divider />

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Name">{manga.name}</Descriptions.Item>
          <Descriptions.Item label="Path">{manga.path}</Descriptions.Item>
          <Descriptions.Item label="Ext">{manga.ext}</Descriptions.Item>
          <Descriptions.Item label="Number of Pages">
            {manga.numOfPages}
          </Descriptions.Item>
          <Descriptions.Item label="Library">
            {manga.library.name}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <div className="flex flex-col items-center">{...pages}</div>
      </>
    );
  }
}
