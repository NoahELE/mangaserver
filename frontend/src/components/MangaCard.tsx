import { Card, Spin } from 'antd';
import { useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Manga } from '../entity';
import { useMangaPage } from '../utils';

interface Props {
  manga: Manga;
}

export default function MangaCard({ manga }: Props): ReactElement {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/manga/${manga.id}`);
  }, [manga.id, navigate]);
  const pageUrl = useMangaPage(manga.id, 0);

  return (
    <>
      <Card
        hoverable
        onClick={onClick}
        cover={
          pageUrl == null ? (
            <Spin />
          ) : (
            <img src={pageUrl} alt={`cover of ${manga.name}`} />
          )
        }
      >
        <Card.Meta title={manga.name} description={manga.path} />
      </Card>
    </>
  );
}
