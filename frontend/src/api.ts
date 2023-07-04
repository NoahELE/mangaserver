import axios from 'axios';
import useSWR, { SWRResponse } from 'swr';
import { Library, Manga, Page, User } from './entity';
import useStore from './store';

axios.defaults.baseURL = '/api';

async function fetcher<T>(url: string): Promise<T> {
  const { data } = await axios.get<T>(url);
  return data;
}

function setJwtHeader(): void {
  const { jwt } = useStore.getState(); // get jwt from store
  if (jwt !== null) {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  } else {
    throw new Error('jwt is null');
  }
}

export async function login(user: User): Promise<string> {
  const { data: jwt } = await axios.post<string>('/user/login', user);
  return jwt;
}

export function useAllLibraries(
  page: number,
  size: number
): SWRResponse<Page<Library[]>> {
  setJwtHeader();
  const params = new URLSearchParams({ page: `${page - 1}`, size: `${size}` });
  return useSWR<Page<Library[]>>(`/library?${params.toString()}`, fetcher);
}

export function useAllMangas(
  libraryId: number,
  page: number,
  size: number
): SWRResponse<Page<Manga[]>> {
  setJwtHeader();
  const params = new URLSearchParams({
    libraryId: `${libraryId}`,
    page: `${page - 1}`,
    size: `${size}`,
  });
  return useSWR<Page<Manga[]>>(`/manga?${params.toString()}`, fetcher);
}

export async function scanManga(libraryId: number): Promise<void> {
  setJwtHeader();
  await axios.get<void>(`/library/${libraryId}/scanManga`);
}

export async function getManga(mangaId: number): Promise<Manga> {
  setJwtHeader();
  const { data: manga } = await axios.get<Manga>(`/manga/${mangaId}`);
  return manga;
}

export async function getMangaPage(
  mangaId: number,
  pageId: number
): Promise<string> {
  setJwtHeader();
  const { data: page } = await axios.get<Blob>(
    `/manga/${mangaId}/page/${pageId}`,
    { responseType: 'blob' }
  );
  // return the data url of the page
  return URL.createObjectURL(page);
}
