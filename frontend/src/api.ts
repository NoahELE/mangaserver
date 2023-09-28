import axios from 'axios';
import useSWR, { type SWRResponse } from 'swr';
import { z } from 'zod';
import type { AddLibraryDto, Library, Manga, Page, User } from './entity';

axios.defaults.baseURL = '/api';
let jwtCache: string | null = null; // the jwt token is cached here
axios.interceptors.request.use((config) => {
  if (jwtCache == null) {
    jwtCache = localStorage.getItem('jwt');
  }
  if (jwtCache != null) {
    config.headers.Authorization = `Bearer ${jwtCache}`;
  }
  return config;
});

type Response<T> = SWRResponse<T, Error>;

async function fetcher<T>(url: string): Promise<T> {
  const { data } = await axios.get<T>(url);
  return data;
}

const jwtSchema = z.string().nonempty();
export async function login(user: User): Promise<string> {
  const { data: jwt } = await axios.post<string>('/user/login', user);
  jwtSchema.parse(jwt);
  return jwt;
}

export function useAllLibraries(
  page: number,
  size: number,
): Response<Page<Library>> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return useSWR<Page<Library>>(`/library?${params.toString()}`, fetcher);
}

export async function addLibrary(library: AddLibraryDto): Promise<void> {
  await axios.post<undefined>('/library', library);
}

export function useAllMangas(
  libraryId: number,
  page: number,
  size: number,
): Response<Page<Manga>> {
  const params = new URLSearchParams({
    libraryId: libraryId.toString(),
    page: page.toString(),
    size: size.toString(),
  });
  return useSWR<Page<Manga>>(`/manga?${params.toString()}`, fetcher);
}

export async function scanManga(libraryId: number): Promise<void> {
  await axios.get<undefined>(`/library/${libraryId}/scanManga`);
}

export function useManga(mangaId: number): Response<Manga> {
  return useSWR<Manga>(`/manga/${mangaId}`, fetcher);
}

export async function getMangaPage(
  mangaId: number,
  pageIndex: number,
): Promise<Blob> {
  const { data: page } = await axios.get<Blob>(
    `/manga/${mangaId}/page/${pageIndex}`,
    { responseType: 'blob' },
  );
  // return the object url of the page
  return page;
}
