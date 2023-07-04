import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Library } from '../entity';

interface Props {
  library: Library;
}

export default function LibraryCard({ library: { id, name, path } }: Props) {
  const navigate = useNavigate();

  return (
    <Card title={name} hoverable onClick={() => navigate(`/library/${id}`)}>
      <p className="break-words">{path}</p>
    </Card>
  );
}
