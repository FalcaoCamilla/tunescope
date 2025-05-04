import { Observable } from "rxjs";

export interface IWikipediaService {
  getBiography(artistName: string): Observable<string>;
}