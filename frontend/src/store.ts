import { atom, getDefaultStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type CurrentView = 'home' | 'library' | 'manga';

export const store = getDefaultStore();
// XXX atomWithStorage getOnInit option is still unstable
export const jwtAtom = atomWithStorage<string | null>(
  'jwt',
  localStorage.getItem('jwt')
);
export const currentViewAtom = atom<CurrentView | null>(null);
export const lastLibraryIdAtom = atom<number | null>(null);
export const lastMangaIdAtom = atom<number | null>(null);
