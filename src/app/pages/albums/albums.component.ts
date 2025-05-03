import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Injector, runInInjectionContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardComponent } from '@shared/components/card/card.component';
import { ListHeaderComponent } from '@shared/components/list-header/list-header.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Album } from '@shared/models/album';
import { PaginatedListService } from '@shared/services/paginated-list.service';
import { SearchService } from '@shared/services/search.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, CardComponent, ListHeaderComponent, PaginationComponent],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
private searchService = inject(SearchService);
  private paginatedListService = inject(PaginatedListService<Album>);
  destroy = inject(DestroyRef);
  inject = inject(Injector);

  displayedAlbums = this.paginatedListService.displayedItems;
  currentPage = this.paginatedListService.currentPage;
  totalPages = this.paginatedListService.totalPages;

  ngOnInit(): void {
    this.listenerSearchTerm();
  }

  private listenerSearchTerm(): void {
    runInInjectionContext(this.inject, () => {
      this.searchService.searchTerm$
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe((searchTerm: string) => {
          this.paginatedListService.resetParams();
          this.paginatedListService.setSearchTerm(searchTerm.trim() !== '' ? searchTerm : 'album');
          this.paginatedListService.loadNextPage('album');
        });
    })
  }

  loadNextPage(): void {
    this.paginatedListService.loadNextPage('album');
  }

  loadPreviousPage(): void {
    this.paginatedListService.loadPreviousPage('album');
  }
}
