interface BaseEntity {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
}

export interface User extends BaseEntity {
  username: string;
  password: string;
}

export interface Library extends BaseEntity {
  name: string;
  path: string;
}

export type AddLibraryDto = Omit<Library, keyof BaseEntity>;

export interface Manga extends BaseEntity {
  name: string;
  path: string;
  ext: string;
  numOfPages: number;
  library: Library;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
}
