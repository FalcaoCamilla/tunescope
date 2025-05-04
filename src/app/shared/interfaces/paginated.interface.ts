import { Signal } from '@angular/core';
import { listType } from '@shared/models';

export interface IPaginatedListService<T> {
  readonly limit: number;
  readonly currentPage: Signal<number>;
  readonly totalPages: Signal<number>;
  readonly displayedItems: Signal<T[]>;

  setSearchTerm(term: string): void;
  resetParams(): void;
  loadNextPage(entityType: listType): void;
  loadPreviousPage(entityType: listType): void;
}