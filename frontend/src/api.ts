import axios from 'axios'
import { Library, Manga, Page, User } from './entity'
import useStore from './store'

axios.defaults.baseURL = '/api'

function setJwtHeader(): void {
  const { jwt } = useStore.getState() // get jwt from store
  if (jwt.length !== 0) {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
  } else {
    throw new Error('jwt is empty')
  }
}

export async function login(user: User): Promise<string> {
  const { data: jwt } = await axios.post<string>('/user/login', user)
  return jwt
}

export async function getAllLibraries(
  page: number,
  size: number
): Promise<Page<Library[]>> {
  setJwtHeader()
  const { data: libraryPage } = await axios.get<Page<Library[]>>('/library', {
    params: { page: page - 1, size },
  })
  return libraryPage
}

export async function getAllMangas(
  libraryId: number,
  page: number,
  size: number
): Promise<Page<Manga[]>> {
  setJwtHeader()
  const { data: mangaPage } = await axios.get<Page<Manga[]>>('/manga', {
    params: { libraryId, page: page - 1, size },
  })
  return mangaPage
}

export async function scanManga(libraryId: number): Promise<void> {
  setJwtHeader()
  await axios.get<void>(`/library/${libraryId}/scanManga`)
}

export async function getManga(mangaId: number): Promise<Manga> {
  setJwtHeader()
  const { data: manga } = await axios.get<Manga>(`/manga/${mangaId}`)
  return manga
}

export async function getMangaPage(
  mangaId: number,
  pageId: number
): Promise<string> {
  setJwtHeader()
  const { data: page } = await axios.get<Blob>(
    `/manga/${mangaId}/page/${pageId}`,
    {
      responseType: 'blob',
    }
  )
  // return the data url of the page
  return URL.createObjectURL(page)
}
