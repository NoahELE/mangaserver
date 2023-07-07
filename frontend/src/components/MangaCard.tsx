import { Card, Spin } from 'antd';
import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMangaPage } from '../api';
import { type Manga } from '../entity';

interface Props {
  manga: Manga;
}

export default function MangaCard({
  manga: { id, name, path },
}: Props): ReactElement {
  const navigate = useNavigate();
  const [cover, setCover] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const onClick = useCallback(() => {
    navigate(`/manga/${id}`);
  }, [id, navigate]);
  if (error != null) {
    throw error;
  }
  useEffect(() => {
    getMangaPage(id, 0)
      .then((page) => {
        setCover(URL.createObjectURL(page));
      })
      .catch((error) => {
        setError(error);
      });
    return () => {
      if (cover != null) {
        URL.revokeObjectURL(cover);
      }
    };
  }, [cover, id]);

  return (
    <Card
      hoverable
      onClick={onClick}
      cover={
        cover == null ? <Spin /> : <img src={cover} alt={`cover of ${name}`} />
      }
    >
      <Card.Meta title={name} description={path} />
    </Card>
  );
}
