import { Button, notification, Typography } from 'antd';
import { useEffect, useId, useState, type ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMangaPage } from './api';
import loadingUrl from './assets/loading.gif';

const { Paragraph } = Typography;

type ErrorCallback = (error: Error) => void;

/**
 * custom hook to show an error notification
 * @returns the callback to show an error notification and the context holder
 */
export function useErrorNotification(): [ErrorCallback, ReactElement] {
  const key = useId();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const closeOnClick = (): void => {
    api.destroy(key);
  };
  const refreshOnClick = (): void => {
    navigate(0);
  };
  const loginOnClick = (): void => {
    navigate('/login');
  };

  const btn = (
    <>
      <Button type="primary" onClick={closeOnClick}>
        Close
      </Button>
      <Button type="default" onClick={refreshOnClick}>
        Refresh
      </Button>
      <Button type="default" onClick={loginOnClick}>
        Login
      </Button>
    </>
  );

  const showError: ErrorCallback = (error) => {
    api.error({
      message: 'Error',
      description: (
        <>
          <Paragraph>An error occurred.</Paragraph>
          <Paragraph>
            ${error.name} - ${error.message}
          </Paragraph>
        </>
      ),
      btn,
      key,
    });
  };

  return [showError, contextHolder];
}

/**
 * custom hook to get id as number from the url params
 * @param param the param name
 * @returns the id as number
 */
export function useParamsId(param: string): number {
  const idString = useParams()[param];
  if (idString == null) {
    throw new Error(`param ${param} does not exist`);
  }
  const id = parseInt(idString);
  if (isNaN(id)) {
    throw new Error(`param ${param} is not a number`);
  }
  return id;
}

/**
 * custom hook to fetch manga page and create corresponding object url
 * @param mangaId the id of the manga
 * @param pageIndex the index of the page
 * @returns the created object url of the manga page
 */
export function useMangaPage(mangaId: number, pageIndex: number): string {
  const [pageUrl, setPageUrl] = useState<string>(loadingUrl);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let url: string | null = null;
    getMangaPage(mangaId, pageIndex)
      .then((page) => {
        url = URL.createObjectURL(page);
        setPageUrl(url);
      })
      .catch((error: Error) => {
        setError(error);
      });
    return () => {
      if (url != null) {
        URL.revokeObjectURL(url);
      }
    };
  }, [mangaId, pageIndex]);
  if (error != null) {
    throw error;
  }
  return pageUrl;
}
