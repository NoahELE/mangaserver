import { Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
  },
];

export default function TopMenu() {
  const navigate = useNavigate();
  return (
    <Menu
      onClick={(info) => {
        switch (info.key) {
          case 'home':
            navigate('/');
            break;
          default:
            throw new Error(`Unknown menu key: ${info.key}`);
        }
      }}
      mode="horizontal"
      items={items}
    />
  );
}
