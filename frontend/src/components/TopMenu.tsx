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
    label: 'Library',
    key: 'library',
  },
  {
    label: 'Series',
    key: 'series',
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
    const currentView = info.key as CurrentView;
    switch (currentView) {
      case 'home':
        navigate('/');
        break;
      case 'series':
        if (lastLibraryId == null) {
          throw new Error('lastLibraryId does not exist');
        }
        navigate(`/series?libraryId=${lastLibraryId}`);
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
        assertNever(currentView);
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

function assertNever(_: never): never {
  throw new Error('Unexpected value');
}
