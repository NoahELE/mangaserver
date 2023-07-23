import { atom, getDefaultStore } from 'jotai';

export type CurrentView = 'home' | 'series' | 'library' | 'manga';

export const store = getDefaultStore();
export const currentViewAtom = atom<CurrentView | null>(null);
export const lastLibraryIdAtom = atom<number | null>(null);
export const lastMangaIdAtom = atom<number | null>(null);
