import { Card } from 'antd';
import { useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Manga } from '../entity';
import MangaPageImage from './MangaPageImage';

interface Props {
  manga: Manga;
}

export default function MangaCard({ manga }: Props): ReactElement {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/manga/${manga.id}`);
  }, [manga.id, navigate]);

  return (
    <>
      <Card
        hoverable
        onClick={onClick}
        cover={<MangaPageImage manga={manga} pageIndex={0} />}
      >
        <Card.Meta title={manga.name} description={manga.path} />
      </Card>
    </>
  );
}
