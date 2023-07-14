import {
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
import { useAllLibraries } from '../api';
import LibraryCard from '../components/LibraryCard';
import Loading from '../components/Loading';
import { currentViewAtom } from '../store';
import { useErrorNotification } from '../utils';
import styles from './HomeView.module.css';

const { Title } = Typography;

function showTotal(total: number, [start, end]: [number, number]): string {
  return `${start}-${end} of ${total} items`;
}

export default function HomeView(): ReactElement {
  // update currentView in store
  const setCurrentView = useSetAtom(currentViewAtom);
  useEffect(() => {
    setCurrentView('home');
  }, [setCurrentView]);

  const [current, setCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const paginationOnChange = useCallback<
    NonNullable<PaginationProps['onChange']>
  >((page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  }, []);

  const [showError, contextHolder] = useErrorNotification();

  // retrieve libraries from api
  const {
    data: librariesPage,
    error,
    isLoading,
  } = useAllLibraries(current, pageSize);
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
  if (librariesPage == null) {
    return (
      <>
        <Empty className={styles.empty} />
        {contextHolder}
      </>
    );
  }

  const libraries = librariesPage.content;
  const total = librariesPage.totalElements;

  const libraryCards = libraries.map((library) => (
    <Col span={6} key={library.id}>
      <LibraryCard library={library} />
    </Col>
  ));

  return (
    <>
      <Title>Library List</Title>
      <Divider />
      <Row gutter={[16, 16]}>{...libraryCards}</Row>
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
      {contextHolder}
    </>
  );
}
