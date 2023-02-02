import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
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
    { version: 0, name: 'mangaserver-storage' }
  )
)

export default useStore
