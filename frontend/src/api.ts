import axios from 'axios';
import useSWR, { type SWRResponse } from 'swr';
import { type Library, type Manga, type Page, type User } from './entity';
import useStore from './store';

axios.defaults.baseURL = '/api';
axios.interceptors.request.use((config) => {
  const { jwt } = useStore.getState(); // get jwt from store
  if (jwt != null) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

async function fetcher<T>(url: string): Promise<T> {
  const { data } = await axios.get<T>(url);
  return data;
}

export async function login(user: User): Promise<string> {
  const { data: jwt } = await axios.post<string>('/user/login', user);
  return jwt;
}

export function useAllLibraries(
  page: number,
  size: number
): SWRResponse<Page<Library[]>> {
  const params = new URLSearchParams({ page: `${page - 1}`, size: `${size}` });
  return useSWR<Page<Library[]>>(`/library?${params.toString()}`, fetcher);
}

export function useAllMangas(
  libraryId: number,
  page: number,
  size: number
): SWRResponse<Page<Manga[]>> {
  const params = new URLSearchParams({
    libraryId: `${libraryId}`,
    page: `${page - 1}`,
    size: `${size}`,
  });
  return useSWR<Page<Manga[]>>(`/manga?${params.toString()}`, fetcher);
}

export async function scanManga(libraryId: number): Promise<void> {
  await axios.get<undefined>(`/library/${libraryId}/scanManga`);
}

export function useManga(mangaId: number): SWRResponse<Manga> {
  return useSWR<Manga>(`/manga/${mangaId}`, fetcher);
}

export async function getMangaPage(
  mangaId: number,
  pageIndex: number
): Promise<Blob> {
  const { data: page } = await axios.get<Blob>(
    `/manga/${mangaId}/page/${pageIndex}`,
    { responseType: 'blob' }
  );
  // return the data url of the page
  return page;
}
