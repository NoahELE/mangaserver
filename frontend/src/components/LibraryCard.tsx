import { Card } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Library } from '../entity';

interface Props {
  library: Library;
}

export default function LibraryCard({ library: { id, name, path } }: Props) {
  const navigate = useNavigate();
  const onClick = useCallback(() => navigate(`/library/${id}`), [id, navigate]);

  return (
    <Card title={name} hoverable onClick={onClick}>
      <p className="break-words">{path}</p>
    </Card>
  );
}
