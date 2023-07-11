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
import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { scanManga, useAllMangas } from '../api';
import Loading from '../components/Loading';
import MangaCard from '../components/MangaCard';
import { currentViewAtom, lastLibraryIdAtom } from '../store';
import { useErrorNotification, useParamsId } from '../utils';

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
  const scanMangaOnClick = useCallback(() => {
    scanManga(libraryId).catch((error) => {
      setScanError(error);
    });
  }, [libraryId]);
  const paginationOnChange = useCallback<
    NonNullable<PaginationProps['onChange']>
  >((page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  }, []);

  const [showError, contextHolder] = useErrorNotification();

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
    return (
      <>
        <Loading />
        {contextHolder}
      </>
    );
  }
  if (mangasPage == null) {
    return (
      <>
        <Empty />
        {contextHolder}
      </>
    );
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
      <div className="mt-10 flex justify-center">
        <Pagination
          current={current}
          total={total}
          showTotal={showTotal}
          pageSize={pageSize}
          showSizeChanger
          onChange={paginationOnChange}
        />
      </div>
      {contextHolder}
    </>
  );
}
