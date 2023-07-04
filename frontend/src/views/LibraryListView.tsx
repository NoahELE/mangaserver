import { Col, Divider, Pagination, Row, Typography } from 'antd';
import { chunk } from 'lodash-es';
import { ReactElement, useState } from 'react';
import { useAllLibraries } from '../api';
import LibraryCard from '../components/LibraryCard';
import Loading from '../components/Loading';

const { Title } = Typography;

export default function LibraryListView(): ReactElement {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { data, error, isLoading } = useAllLibraries(current, pageSize);

  if (error) {
    throw error;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    throw new Error('null or undefined data');
  }

  const libraries = data.content;
  const total = data.totalElements;

  const libraryCards = chunk(libraries, 4).map((row) =>
    row.map((library) => (
      <Col span={6} key={library.id}>
        <LibraryCard library={library} />
      </Col>
    ))
  );

  return (
    <>
      <Title>Library List</Title>

      <Divider />

      <Row gutter={[16, 16]}>{...libraryCards}</Row>

      <div className="mt-10 flex justify-center">
        <Pagination
          current={current}
          total={total}
          showTotal={(total, [start, end]) =>
            `${start}-${end} of ${total} items`
          }
          pageSize={pageSize}
          showSizeChanger
          onChange={(page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
}
