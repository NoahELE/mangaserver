import { Card } from 'antd';
import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Library } from '../entity';

interface Props {
  library: Library;
}

export default function LibraryCard({ library }: Props): ReactElement {
  const navigate = useNavigate();
  const onClick = (): void => {
    navigate(`/library/${library.id}`);
  };

  return (
    <Card title={library.name} hoverable onClick={onClick}>
      <p className="break-words">{library.path}</p>
    </Card>
  );
}
