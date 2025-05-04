import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Injector, Input, runInInjectionContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardComponent } from '@shared/components/card/card.component';
import { ListHeaderComponent } from '@shared/components/list-header/list-header.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { SkeletonCardComponent } from '@shared/components/skeleton-card/skeleton-card.component';
import { Album } from '@shared/models/album';
import { PaginatedListService } from '@shared/services/paginated-list.service';
import { SearchService } from '@shared/services/search.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, CardComponent, ListHeaderComponent, PaginationComponent, SkeletonCardComponent],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
private searchService = inject(SearchService);
  private paginatedListService = inject(PaginatedListService<Album>);
  destroy = inject(DestroyRef);
  inject = inject(Injector);

  @Input() artistId: string | null = null;

  displayedAlbums = this.paginatedListService.displayedItems;
  currentPage = this.paginatedListService.currentPage;
  totalPages = this.paginatedListService.totalPages;
  loading = this.paginatedListService.loading;

  skeletonArray = Array(12);

  ngOnInit(): void {
    this.loading.set(true);
    this.paginatedListService.resetParams();
    if(this.artistId) {
      this.paginatedListService.loadNextPage('artist', this.artistId);
    } else {
      this.listenerSearchTerm()
    };
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
    if(this.artistId) {
      return this.paginatedListService.loadNextPage('artist', this.artistId);
    }
    this.paginatedListService.loadNextPage('album');
  }

  loadPreviousPage(): void {
    this.paginatedListService.loadPreviousPage();
  }
}
