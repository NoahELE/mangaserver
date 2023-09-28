import { z } from 'zod';

const baseEntitySchema = z.object({
  id: z.number(),
  createdDate: z.date(),
  lastModifiedDate: z.date(),
});
type BaseEntity = z.infer<typeof baseEntitySchema>;

export const userSchema = baseEntitySchema.extend({
  username: z.string(),
  password: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const librarySchema = baseEntitySchema.extend({
  name: z.string(),
  path: z.string(),
});
export type Library = z.infer<typeof librarySchema>;

export type AddLibraryDto = Omit<Library, keyof BaseEntity>;

export const mangaSchema = baseEntitySchema.extend({
  name: z.string(),
  path: z.string(),
  ext: z.string(),
  numOfPages: z.number(),
  library: librarySchema,
});
export type Manga = z.infer<typeof mangaSchema>;

export interface Page<T> {
  content: T[];
  totalElements: number;
}
