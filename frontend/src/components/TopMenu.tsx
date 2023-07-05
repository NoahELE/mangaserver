import { Menu, MenuProps } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
  },
];

export default function TopMenu() {
  const navigate = useNavigate();
  const onClick = useCallback<NonNullable<MenuProps['onClick']>>(
    (info) => {
      switch (info.key) {
        case 'home':
          navigate('/');
          break;
        default:
          throw new Error(`unknown menu key: ${info.key}`);
      }
    },
    [navigate]
  );

  return (
    <Menu onClick={onClick} selectedKeys={[]} mode="horizontal" items={items} /> // TODO: selectedKeys
  );
}
