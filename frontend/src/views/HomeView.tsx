import {
  Col,
  Divider,
  Empty,
  Pagination,
  Row,
  Typography,
  type PaginationProps,
} from 'antd';
import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { useAllLibraries } from '../api';
import LibraryCard from '../components/LibraryCard';
import Loading from '../components/Loading';
import useStore, { CurrentPage } from '../store';
import { useErrorNotification } from '../utils';

const { Title } = Typography;

function showTotal(total: number, [start, end]: [number, number]): string {
  return `${start}-${end} of ${total} items`;
}

export default function HomeView(): ReactElement {
  // update currentPage in store
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  useEffect(() => {
    setCurrentPage(CurrentPage.HOME);
  }, [setCurrentPage]);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const paginationOnChange = useCallback<
    NonNullable<PaginationProps['onChange']>
  >((page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  }, []);

  const [showError, contextHolder] = useErrorNotification();

  // retrieve libraries from api
  const { data, error, isLoading } = useAllLibraries(current, pageSize);
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

  const libraries = data?.content ?? [];
  const total = data?.totalElements ?? 0;

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
