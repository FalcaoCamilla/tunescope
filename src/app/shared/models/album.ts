import { Artist } from "./artist";

export type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: Partial<Artist>[];
}

type Image = {
  url: string,
  height: 300,
  width: 300
}