import { Card } from 'antd';
import { useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Library } from '../entity';

interface Props {
  library: Library;
}

export default function LibraryCard({
  library: { id, name, path },
}: Props): ReactElement {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/library/${id}`);
  }, [id, navigate]);

  return (
    <Card title={name} hoverable onClick={onClick}>
      <p className="break-words">{path}</p>
    </Card>
  );
}
