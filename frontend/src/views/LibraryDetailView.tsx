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
import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { scanManga, useAllMangas } from '../api';
import Loading from '../components/Loading';
import MangaCard from '../components/MangaCard';
import useStore, { CurrentPage } from '../store';
import { useErrorNotification } from '../utils';

const { Title } = Typography;

function showTotal(total: number, [start, end]: [number, number]): string {
  return `${start}-${end} of ${total} items`;
}

export default function LibraryDetailView(): ReactElement {
  // parse libraryId from url
  const { libraryId: libraryIdString } = useParams();
  if (libraryIdString == null) {
    throw new Error('libraryId does not exist');
  }
  const libraryId = parseInt(libraryIdString);
  if (isNaN(libraryId)) {
    throw new Error('libraryId is not a number');
  }

  // update currentPage and lastLibraryId in store
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setLastLibraryId = useStore((state) => state.setLastLibraryId);
  useEffect(() => {
    setCurrentPage(CurrentPage.LIBRARY);
    setLastLibraryId(libraryId);
  }, [libraryId, setCurrentPage, setLastLibraryId]);

  const [current, setCurrent] = useState(1);
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
  const { data, error, isLoading } = useAllMangas(libraryId, current, pageSize);
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
  if (data == null) {
    return (
      <>
        <Empty />
        {contextHolder}
      </>
    );
  }

  const mangas = data.content;
  const total = data.totalElements;

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
