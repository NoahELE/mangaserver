import { Menu, type MenuProps } from 'antd';
import { useAtomValue } from 'jotai';
import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  currentViewAtom,
  lastLibraryIdAtom,
  lastMangaIdAtom,
  type CurrentView,
} from '../store';

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Author',
    key: 'author',
  },
  {
    label: 'Library',
    key: 'library',
  },
  {
    label: 'Manga',
    key: 'manga',
  },
];

export default function TopMenu(): ReactElement {
  const navigate = useNavigate();
  const currentView = useAtomValue(currentViewAtom);
  const lastLibraryId = useAtomValue(lastLibraryIdAtom);
  const lastMangaId = useAtomValue(lastMangaIdAtom);
  const onClick: MenuProps['onClick'] = (info) => {
    switch (info.key as CurrentView) {
      case 'home':
        navigate('/');
        break;
      case 'author':
        if (lastLibraryId == null) {
          throw new Error('lastLibraryId does not exist');
        }
        navigate(`/author?libraryId=${lastLibraryId}`);
        break;
      case 'library':
        if (lastLibraryId == null) {
          throw new Error('lastLibraryId does not exist');
        }
        navigate(`/library/${lastLibraryId}`);
        break;
      case 'manga':
        if (lastMangaId == null) {
          throw new Error('lastMangaId does not exist');
        }
        navigate(`/manga/${lastMangaId}}`);
        break;
      default:
        throw new Error(`unknown menu key: ${info.key}`);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[currentView ?? '']}
      mode="horizontal"
      items={items}
    />
  );
}
