import { Image } from "./image"

export type Artist = {
  external_urls: {
    spotify: string
  },
  followers: {
    href: string,
    total: number
  },
  genres: string[],
  href: string,
  id: string,
  images: Image[],
  name: string,
  popularity: number,
  type: string,
  uri: string
}