import { Descriptions, Divider, Empty, Typography } from 'antd';
import { useSetAtom } from 'jotai';
import { useEffect, type ReactElement } from 'react';
import { useManga } from '../api';
import Loading from '../components/Loading';
import MangaPageImage from '../components/MangaPageImage';
import { currentViewAtom, lastMangaIdAtom } from '../store';
import { useErrorNotification, useParamsId } from '../utils';
import styles from './MangaDetailView.module.css';

const { Title } = Typography;

export default function MangaDetailView(): ReactElement {
  // parse mangaId from url
  const mangaId = useParamsId('mangaId');

  // update currentView and lastMangaId in store
  const setCurrentView = useSetAtom(currentViewAtom);
  const setLastMangaId = useSetAtom(lastMangaIdAtom);
  useEffect(() => {
    setCurrentView('manga');
    setLastMangaId(mangaId);
  }, [mangaId, setCurrentView, setLastMangaId]);

  const [showError, contextHolder] = useErrorNotification();

  // retrieve manga from api
  const { data: manga, error, isLoading } = useManga(mangaId);
  if (error != null) {
    showError(error);
  }
  if (isLoading) {
    return (
      <>
        <Loading />
        {contextHolder}
      </>
    );
  }
  if (manga == null) {
    return (
      <>
        <Empty className={styles.empty} />
        {contextHolder}
      </>
    );
  }

  const pages: ReactElement[] = [];
  for (let pageIndex = 0; pageIndex < manga.numOfPages; pageIndex++) {
    pages.push(
      <MangaPageImage
        manga={manga}
        pageIndex={pageIndex}
        key={`${manga.id}-${pageIndex}`}
      />,
    );
  }

  return (
    <>
      <Title>{manga.name}</Title>
      <Divider />
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Name">{manga.name}</Descriptions.Item>
        <Descriptions.Item label="Path">{manga.path}</Descriptions.Item>
        <Descriptions.Item label="Ext">{manga.ext}</Descriptions.Item>
        <Descriptions.Item label="Number of Pages">
          {manga.numOfPages}
        </Descriptions.Item>
        <Descriptions.Item label="Library">
          {manga.library.name}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <div className={styles.pages}>{...pages}</div>
      {contextHolder}
    </>
  );
}
