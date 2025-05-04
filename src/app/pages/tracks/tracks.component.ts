import { Component, DestroyRef, inject, Injector, Input, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardComponent } from '@shared/components/card/card.component';
import { ListHeaderComponent } from '@shared/components/list-header/list-header.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { SkeletonCardComponent } from '@shared/components/skeleton-card/skeleton-card.component';
import { Track } from '@shared/models/track';
import { PaginatedListService } from '@shared/services/paginated-list.service';
import { SearchService } from '@shared/services/search.service';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [CommonModule, CardComponent, ListHeaderComponent, PaginationComponent, SkeletonCardComponent],
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {
  private searchService = inject(SearchService);
  private paginatedListService = inject(PaginatedListService<Track>);
  destroy = inject(DestroyRef);
  inject = inject(Injector);

  @Input() albumId: string | null = null;

  displayedTracks = this.paginatedListService.displayedItems;
  currentPage = this.paginatedListService.currentPage;
  totalPages = this.paginatedListService.totalPages;
  loading = this.paginatedListService.loading ?? true;

  skeletonArray = Array(12);

  ngOnInit(): void {
    this.paginatedListService.resetParams();
    if(this.albumId) {
      this.paginatedListService.loadNextPage('album', this.albumId);
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
          this.paginatedListService.setSearchTerm(searchTerm.trim() !== '' ? searchTerm : 'track');
          this.paginatedListService.loadNextPage('track');
        });
    })
  }

  loadNextPage(): void {
    if(this.albumId) {
      return this.paginatedListService.loadNextPage('album', this.albumId);
    }
    this.paginatedListService.loadNextPage('track');
  }

  loadPreviousPage(): void {
    this.paginatedListService.loadPreviousPage();
  }
}
