import axios from 'axios'

axios.defaults.baseURL = '/api'

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
  ext: string
  path: string
  library: Library
}

export const api = {
  async login(user: User): Promise<string> {
    const { data: jwtResponse } = await axios.post<R<string>>(
      '/user/login',
      user
    )
    if (jwtResponse.code === 0) {
      return jwtResponse.data
    } else {
      throw new Error(
        `code: ${jwtResponse.code}\nlogin failed\n${jwtResponse.msg}`
      )
    }
  },

  setJwt(jwt: string): void {
    axios.defaults.headers.common.Authorization = 'Bearer ' + jwt
  },

  async getAllLibraries(): Promise<Library[]> {
    const { data: librariesResponse } = await axios.get<R<Library[]>>(
      '/library'
    )
    if (librariesResponse.code === 0) {
      return librariesResponse.data
    } else {
      throw new Error(
        `code: ${librariesResponse.code}\nfailed to get libraries\n${librariesResponse.msg}`
      )
    }
  },
}
