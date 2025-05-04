import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { listType } from '@shared/models';
import { IPaginatedListService } from '@shared/interfaces/paginated';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatedListService<T> implements IPaginatedListService<T> {
  readonly limit = 20;

  apiService = inject(ApiService);
  
  private items = signal<T[]>([]);
  private searchTerm = signal('');
  private totalItems = signal(0);
  loading = signal(true);
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

  private fetchList(listType: listType): void {
    const offset = (this.currentPage() - 1) * this.limit;
    let params = {
      searchTerm: this.searchTerm(),
      listType: listType,
      limit: this.limit,
      offset: offset,
    };

    this.apiService.getListByName<T>(params)
    .pipe(finalize(() => this.loading.set(false))).subscribe({
        next: (res) => {
          this.items.update((prev) => [...prev, ...res.items]);
          this.totalItems.set(res.total);
        },
        error: (err) => {
          console.error('Error fetching items:', err);
        }
      });
  }

  private fetchListById(listType: listType, itemId: string, itemType: listType): void {
    const offset = (this.currentPage() - 1) * this.limit;
    let params = {
      itemType: itemType,
      itemId: itemId,
      listType: listType,
      limit: this.limit,
      offset: offset,
    };
    
    this.apiService.getListById<T>(params)
      .pipe(finalize(() => this.loading.set(false))).subscribe({
        next: (res) => {
          this.items.update((prev) => [...prev, ...res.items]);
          this.totalItems.set(res.total);
        },
        error: (err) => {
          console.error('Error fetching items:', err);
        },
      });
  }

  setFetch(listType: listType, itemId?: string): void {
    this.loading.set(true);
    if (listType === 'artist' && itemId) {
      this.fetchListById('album', itemId, listType);
    } else if (listType === 'album' && itemId) {
      this.fetchListById('track', itemId, listType);
    } else if (listType === 'artist' || listType === 'album' || listType === 'track') {
      this.fetchList(listType);
    } else {
      console.error(`Tipo de entidade desconhecido: ${listType}`);
    }
  }

  loadNextPage(listType: listType, itemId?: string): void {
    const nextPage = this.currentPage() + 1;
  
    const isFirstPageEmpty = this.currentPage() === 1 && !this.items().length;
    const hasMorePages = this.currentPage() < this.totalPages();
  
    if (isFirstPageEmpty) return this.setFetch(listType, itemId);
    if (!hasMorePages) return;
  
    const start = (nextPage - 1) * this.limit;
    const end = start + this.limit;
    const itemsLoaded = this.items().length;
  
    //caso os itens da próxima página já estejam carregados
    if (itemsLoaded >= end) return this.currentPage.set(nextPage);
  
    this.currentPage.set(nextPage);
    this.setFetch(listType, itemId);
  }

  loadPreviousPage(): void {
    if (this.currentPage() > 1) {
      const previousPage = this.currentPage() - 1;
      this.currentPage.set(previousPage);
    }
  }
}