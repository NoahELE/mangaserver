import { Menu, type MenuProps } from 'antd';
import { useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore, { CurrentPage } from '../store';

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: CurrentPage.HOME,
  },
  {
    label: 'Library',
    key: CurrentPage.LIBRARY,
  },
  {
    label: 'Manga',
    key: CurrentPage.MANGA,
  },
];

export default function TopMenu(): ReactElement {
  const navigate = useNavigate();
  const currentPage = useStore((state) => state.currentPage);
  const lastLibraryId = useStore((state) => state.lastLibraryId);
  const lastMangaId = useStore((state) => state.lastMangaId);
  const onClick = useCallback<NonNullable<MenuProps['onClick']>>(
    (info) => {
      switch (info.key) {
        case CurrentPage.HOME:
          navigate('/');
          break;
        case CurrentPage.LIBRARY:
          if (lastLibraryId == null) {
            throw new Error('lastLibraryId does not exist');
          }
          navigate(`/library/${lastLibraryId.toString()}`);
          break;
        case CurrentPage.MANGA:
          if (lastMangaId == null) {
            throw new Error('lastMangaId does not exist');
          }
          navigate(`/manga/${lastMangaId.toString()}}`);
          break;
        default:
          throw new Error(`unknown menu key: ${info.key}`);
      }
    },
    [lastLibraryId, lastMangaId, navigate]
  );

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[currentPage]}
      mode="horizontal"
      items={items}
    />
  );
}
