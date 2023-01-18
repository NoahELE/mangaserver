import axios from 'axios'
import { Library, Manga, User } from './entity'
import useStore from './store'

interface R<T> {
  code: number
  msg: string
  data: T
}

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
  const {
    data: { code, msg, data: jwt },
  } = await axios.post<R<string>>('/user/login', user)

  if (code === 0) {
    return jwt
  } else {
    throw new Error(`code: ${code}\nlogin failed\n${msg}`)
  }
}

export async function getAllLibraries(): Promise<Library[]> {
  setJwtHeader()

  const {
    data: { code, msg, data: libraries },
  } = await axios.get<R<Library[]>>('/library')

  if (code === 0) {
    return libraries
  } else {
    throw new Error(`code: ${code}\nfailed to get libraries\n${msg}`)
  }
}

// export function useAllLibraries(): Library[] {
//   const { data, error, isLoading } = useSWR(undefined, fetcher)
// }

export async function getAllMangas(libraryId: number): Promise<Manga[]> {
  setJwtHeader()

  const {
    data: { code, msg, data: mangas },
  } = await axios.get<R<Manga[]>>(`/library/${libraryId}/listManga`)

  if (code === 0) {
    return mangas
  } else {
    throw new Error(`code: ${code}\nfailed to get mangas\n${msg}`)
  }
}

export async function scanManga(libraryId: number): Promise<void> {
  setJwtHeader()

  const {
    data: { code, msg },
  } = await axios.get<R<void>>(`/library/${libraryId}/scanManga`)

  if (code !== 0) {
    throw new Error(`code: ${code}\nfailed to scan manga\n${msg}`)
  }
}

export async function getManga(mangaId: number): Promise<Manga> {
  setJwtHeader()

  const {
    data: { code, msg, data: manga },
  } = await axios.get<R<Manga>>(`/manga/${mangaId}`)

  if (code === 0) {
    return manga
  } else {
    throw new Error(`${code}\nfailed to get manga\n${msg}`)
  }
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
