import { Injectable } from '@angular/core';
import { ISearchService } from '@shared/interfaces/search.interface';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements ISearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable().pipe(
    debounceTime(800),
    distinctUntilChanged()
  );
  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
}
