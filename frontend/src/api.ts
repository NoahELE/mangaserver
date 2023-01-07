import axios from 'axios'
import { json } from 'react-router-dom'
import useStore from './store'

interface R<T> {
  code: number
  msg: string
  data: T
}

interface BaseEntity {
  id: number
  createdDate: Date
  lastModifiedDate: Date
}

export interface User extends BaseEntity {
  username: string
  password: string
}

export interface Library extends BaseEntity {
  name: string
  path: string
}

export interface Manga extends BaseEntity {
  name: string
  path: string
  ext: string
  library: Library
}

axios.defaults.baseURL = '/api'

function setJwtHeader(): void {
  const { jwt } = useStore.getState() // get jwt from store
  if (jwt.length !== 0) {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
  } else {
    throw json({ msg: 'jwt is empty' })
  }
}

const api = {
  async login(user: User): Promise<string> {
    const { data: jwtResponse } = await axios.post<R<string>>(
      '/user/login',
      user
    )
    if (jwtResponse.code === 0) {
      return jwtResponse.data
    } else {
      throw json({
        msg: `code: ${jwtResponse.code}\nlogin failed\n${jwtResponse.msg}`,
      })
    }
  },

  async getAllLibraries(): Promise<Library[]> {
    setJwtHeader() // set jwt auth token
    const {
      data: { code, data: libraries, msg },
    } = await axios.get<R<Library[]>>('/library')
    if (code === 0) {
      return libraries
    } else {
      throw json({
        msg: `code: ${code}\nfailed to get libraries\n${msg}`,
      })
    }
  },

  async getAllManga(libraryId: number): Promise<Manga[]> {
    setJwtHeader() // set jwt auth token
    const {
      data: { code, data: manga, msg },
    } = await axios.get<R<Manga[]>>(`/library/${libraryId}/listManga`)
    if (code === 0) {
      return manga
    } else {
      throw json({
        msg: `code: ${code}\nfailed to get manga\n${msg}`,
      })
    }
  },
}

export default api
