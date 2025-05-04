import { Album } from "./album";
import { Artist } from "./artist";

export type Track = {
  album: Album;
  artists: Pick<Artist, 'external_urls' | 'href' | 'id' | 'name' | 'type' | 'uri'>[];
  avaliable_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}