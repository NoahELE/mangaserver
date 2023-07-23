import { PlusOutlined } from '@ant-design/icons';
import {
  Card,
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
import { useAllLibraries } from '../api';
import AddLibraryModal from '../components/AddLibraryModal';
import LibraryCard from '../components/LibraryCard';
import Loading from '../components/Loading';
import { currentViewAtom } from '../store';
import { useShowError } from '../utils';
import styles from './HomeView.module.css';

const { Title } = Typography;

const showTotal: PaginationProps['showTotal'] = (total, [start, end]) => {
  return `${start}-${end} of ${total} items`;
};

export default function HomeView(): ReactElement {
  // update currentView in store
  const setCurrentView = useSetAtom(currentViewAtom);
  useEffect(() => {
    setCurrentView('home');
  }, [setCurrentView]);

  const [current, setCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [open, setOpen] = useState(false);

  const showError = useShowError();

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
    return <Loading />;
  }
  if (librariesPage == null) {
    return <Empty className={styles.empty} />;
  }

  const libraries = librariesPage.content;
  const total = librariesPage.totalElements;

  const libraryCards = libraries.map((library) => (
    <Col span={6} key={library.id}>
      <LibraryCard library={library} />
    </Col>
  ));

  const onClick = (): void => {
    setOpen(true);
  };
  libraryCards.push(
    <Col span={6} key={'addLibrary'}>
      <Card className={styles.addCard} hoverable onClick={onClick}>
        <PlusOutlined className={styles.addIcon} />
      </Card>
    </Col>,
  );

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };
  return (
    <>
      <Title>Library List</Title>
      <Divider />
      <Row gutter={[16, 16]}>{...libraryCards}</Row>
      <AddLibraryModal open={open}></AddLibraryModal>
      <div className={styles.pagination}>
        <Pagination
          current={current}
          total={total}
          showTotal={showTotal}
          pageSize={pageSize}
          showSizeChanger
          onChange={onChange}
        />
      </div>
    </>
  );
}
