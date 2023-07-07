import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  jwt: string | null;
  currentPage: CurrentPage;
  lastLibraryId: number | null;
  lastMangaId: number | null;
}

interface Action {
  setJwt: (jwt: string) => void;
  setCurrentPage: (currentPage: CurrentPage) => void;
  setLastLibraryId: (lastLibraryId: number | null) => void;
  setLastMangaId: (lastMangaId: number | null) => void;
}

export enum CurrentPage {
  UNKNOWN = 'UNKNOWN',
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  MANGA = 'MANGA',
}

const useStore = create<State & Action>()(
  persist(
    (set) => ({
      jwt: null,
      setJwt: (jwt) => {
        set({ jwt });
      },
      currentPage: CurrentPage.UNKNOWN,
      setCurrentPage: (currentPage) => {
        set({ currentPage });
      },
      lastLibraryId: null,
      setLastLibraryId: (lastLibraryId) => {
        set({ lastLibraryId });
      },
      lastMangaId: null,
      setLastMangaId: (lastMangaId) => {
        set({ lastMangaId });
      },
    }),
    {
      version: 1,
      name: 'mangaserver-storage',
      partialize: (state) => ({
        jwt: state.jwt,
      }),
    }
  )
);

export default useStore;
