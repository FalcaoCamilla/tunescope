import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IWikipediaService } from '@shared/interfaces/wikipedia';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService implements IWikipediaService {
  private apiUrl = `${environment.wikipediaApi}/page/summary`;
  http = inject(HttpClient);

  getBiography(artistName: string): Observable<string> {
    const formattedName = encodeURIComponent(artistName);
    return this.http.get<{ extract: string }>(`${this.apiUrl}/${formattedName}`).pipe(map((res) => res.extract));  
  }
}
