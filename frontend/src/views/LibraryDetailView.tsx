import {
  Button,
  Col,
  Divider,
  Empty,
  Pagination,
  Row,
  Typography,
  type PaginationProps,
} from 'antd';
import { useSetAtom } from 'jotai';
import { useEffect, useState, type ReactElement } from 'react';
import { scanManga, useAllMangas } from '../api';
import Loading from '../components/Loading';
import MangaCard from '../components/MangaCard';
import { currentViewAtom, lastLibraryIdAtom } from '../store';
import { useParamsId, useShowError } from '../utils';
import styles from './LibraryDetailView.module.css';

const { Title } = Typography;

function showTotal(total: number, [start, end]: [number, number]): string {
  return `${start}-${end} of ${total} items`;
}

export default function LibraryDetailView(): ReactElement {
  // parse libraryId from url
  const libraryId = useParamsId('libraryId');

  // update currentView and lastLibraryId in store
  const setCurrentView = useSetAtom(currentViewAtom);
  const setLastLibraryId = useSetAtom(lastLibraryIdAtom);
  useEffect(() => {
    setCurrentView('library');
    setLastLibraryId(libraryId);
  }, [libraryId, setCurrentView, setLastLibraryId]);

  const [current, setCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [scanError, setScanError] = useState<Error | null>(null);
  const scanMangaOnClick = (): void => {
    scanManga(libraryId).catch((error: Error) => {
      setScanError(error);
    });
  };
  const paginationOnChange: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const showError = useShowError();

  // retrieve mangas from api
  const {
    data: mangasPage,
    error,
    isLoading,
  } = useAllMangas(libraryId, current, pageSize);
  if (scanError != null) {
    showError(scanError);
  }
  if (error != null) {
    showError(error);
  }
  if (isLoading) {
    return <Loading />;
  }
  if (mangasPage == null) {
    return <Empty className={styles.empty} />;
  }

  const mangas = mangasPage.content;
  const total = mangasPage.totalElements;

  const mangaCards = mangas.map((manga) => (
    <Col span={4} key={manga.id}>
      <MangaCard manga={manga} />
    </Col>
  ));

  return (
    <>
      <Title>Manga List</Title>
      <Button type="default" onClick={scanMangaOnClick}>
        Scan Manga
      </Button>
      <Divider />
      <Row gutter={[16, 16]}>{...mangaCards}</Row>
      <div className={styles.pagination}>
        <Pagination
          current={current}
          total={total}
          showTotal={showTotal}
          pageSize={pageSize}
          showSizeChanger
          onChange={paginationOnChange}
        />
      </div>
    </>
  );
}
