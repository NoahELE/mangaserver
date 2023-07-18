import { Card } from 'antd';
import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Manga } from '../entity';
import { useMangaPage } from '../utils';

interface Props {
  manga: Manga;
}

export default function MangaCard({ manga }: Props): ReactElement {
  const navigate = useNavigate();
  const onClick = (): void => {
    navigate(`/manga/${manga.id}`);
  };
  const pageUrl = useMangaPage(manga.id, 0);

  return (
    <>
      <Card
        hoverable
        onClick={onClick}
        cover={<img src={pageUrl} alt={`cover of ${manga.name}`} />}
      >
        <Card.Meta title={manga.name} description={manga.path} />
      </Card>
    </>
  );
}
