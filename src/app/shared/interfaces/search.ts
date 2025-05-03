import { Observable } from 'rxjs';

export interface ISearchService {
  readonly searchTerm$: Observable<string>;
  updateSearchTerm(term: string): void;
}