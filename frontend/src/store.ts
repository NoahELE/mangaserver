import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface State {
  jwt: string
  setJwt(jwt: string): void
}

const useStore = create<State>()(
  persist(
    (set) => ({
      jwt: '',
      setJwt(jwt) {
        set({ jwt })
      },
    }),
    { name: 'mangaserver-storage' }
  )
)

export default useStore
