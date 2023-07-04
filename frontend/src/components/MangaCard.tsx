import { Card, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMangaPage } from '../api';
import { Manga } from '../entity';

interface Props {
  manga: Manga;
}

export default function MangaCard({ manga: { id, name, path } }: Props) {
  const navigate = useNavigate();
  const [cover, setCover] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);
  if (error !== null) {
    throw error;
  }
  useEffect(() => {
    getMangaPage(id, 0)
      .then((page) => setCover(page))
      .catch((error) => setError(error));
  }, [id]);

  return (
    <Card
      hoverable
      onClick={() => navigate(`/manga/${id}`)}
      cover={
        cover === null ? <Spin /> : <img src={cover} alt={`cover of ${name}`} />
      }
    >
      <Card.Meta title={name} description={path} />
    </Card>
  );
}
