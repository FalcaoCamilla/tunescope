import { ApiResponse } from "./api-response";
import { Artist } from "./artist";
import { Track } from "./track";

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
  tracks: ApiResponse<Track>;
}

type Image = {
  url: string,
  height: 300,
  width: 300
}