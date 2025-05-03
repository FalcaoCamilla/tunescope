import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { listType } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class PaginatedListService<T> {
  readonly limit = 20;

  apiService = inject(ApiService);
  
  private items = signal<T[]>([]);
  private searchTerm = signal('');
  private totalItems = signal(0);
  currentPage = signal(1);

  totalPages = computed(() => Math.ceil(this.totalItems() / this.limit));
  displayedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.limit;
    const end = start + this.limit;
    return this.items().slice(start, end);
  });

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  resetParams(): void {
    this.currentPage.set(1);
    this.items.set([]);
  }

  private fetchItems(entityType: listType): void {
    const offset = (this.currentPage() - 1) * this.limit;
    this.apiService
      .getListByName<T>(this.searchTerm(), entityType, this.limit, offset)
      .subscribe({
        next: (res) => {
          this.items.update((prev) => [...prev, ...res.items]);
          this.totalItems.set(res.total);
        },
        error: (err) => {
          console.error('Error fetching items:', err);
        },
      });
  }

  loadNextPage(entityType: listType): void {
    const nextPage = this.currentPage() + 1;
  
    const isFirstPageEmpty = this.currentPage() === 1 && !this.items().length;
    const hasMorePages = this.currentPage() < this.totalPages();
  
    if (isFirstPageEmpty) return this.fetchItems(entityType);
    if (!hasMorePages) return;
  
    const start = (nextPage - 1) * this.limit;
    const end = start + this.limit;
    const itemsLoaded = this.items().length;
  
    //caso os itens da próxima página já estejam carregados
    if (itemsLoaded >= end) return this.currentPage.set(nextPage);
  
    this.currentPage.set(nextPage);
    this.fetchItems(entityType);
  }

  loadPreviousPage(entityType: listType): void {
    if (this.currentPage() > 1) {
      const previousPage = this.currentPage() - 1;
      const start = (previousPage - 1) * this.limit;
      const end = start + this.limit;

      //caso os itens da página anterior já estejam carregados
      if (this.items().length >= end) return this.currentPage.set(previousPage);

      this.currentPage.set(previousPage);
      this.fetchItems(entityType);
    }
  }
}