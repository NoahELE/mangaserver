import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface State {
  jwt: string
  setJwt: (jwt: string) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      jwt: '',
      setJwt: (jwt) => set({ jwt }),
    }),
    { name: 'mangaserver-storage' }
  )
)
