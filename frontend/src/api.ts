import axios from 'axios';
import useSWR, { type SWRResponse } from 'swr';
import type { Library, Manga, Page, User } from './entity';
import { jwtAtom, store } from './store';

axios.defaults.baseURL = '/api';
axios.interceptors.request.use((config) => {
  const jwt = store.get(jwtAtom); // get jwt from store
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
  return useSWR<Page<Library[]>>(`/library?page=${page}&size=${size}`, fetcher);
}

export function useAllMangas(
  libraryId: number,
  page: number,
  size: number
): SWRResponse<Page<Manga[]>> {
  return useSWR<Page<Manga[]>>(
    `/manga?libraryId=${libraryId}&page=${page}&size=${size}`,
    fetcher
  );
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
