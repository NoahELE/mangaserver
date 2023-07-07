import { Descriptions, Divider, Empty, Typography } from 'antd';
import { useEffect, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useManga } from '../api';
import Loading from '../components/Loading';
import MangaPageImage from '../components/MangaPageImage';
import useStore, { CurrentPage } from '../store';
import { useErrorNotification } from '../utils';

const { Title } = Typography;

export default function MangaDetailView(): ReactElement {
  // parse mangaId from url
  const { mangaId: mangaIdString } = useParams();
  if (mangaIdString == null) {
    throw new Error('mangaId does not exist');
  }
  const mangaId = parseInt(mangaIdString);
  if (isNaN(mangaId)) {
    throw new Error('mangaId is not a number');
  }

  // update currentPage and lastMangaId in store
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setLastMangaId = useStore((state) => state.setLastMangaId);
  useEffect(() => {
    setCurrentPage(CurrentPage.MANGA);
    setLastMangaId(mangaId);
  }, [mangaId, setCurrentPage, setLastMangaId]);

  const [showError, contextHolder] = useErrorNotification();

  // retrieve manga from api
  const { data, error, isLoading } = useManga(mangaId);
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

  const pages: ReactElement[] = [];
  for (let pageIndex = 0; pageIndex < data.numOfPages; pageIndex++) {
    pages.push(
      <MangaPageImage manga={data} pageIndex={pageIndex} key={pageIndex} />
    );
  }

  return (
    <>
      <Title>{data.name}</Title>
      <Divider />
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Path">{data.path}</Descriptions.Item>
        <Descriptions.Item label="Ext">{data.ext}</Descriptions.Item>
        <Descriptions.Item label="Number of Pages">
          {data.numOfPages}
        </Descriptions.Item>
        <Descriptions.Item label="Library">
          {data.library.name}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <div className="flex flex-col items-center">{...pages}</div>
      {contextHolder}
    </>
  );
}
