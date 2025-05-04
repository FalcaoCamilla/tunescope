import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Injector, OnInit, inject, runInInjectionContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Artist } from '@shared/models';
import { CardComponent } from '@shared/components/card/card.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { SearchService } from '@shared/services/search.service';
import { PaginatedListService } from '@shared/services/paginated-list.service';
import { ListHeaderComponent } from '@shared/components/list-header/list-header.component';
import { SkeletonCardComponent } from '@shared/components/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, CardComponent, ListHeaderComponent, PaginationComponent, SkeletonCardComponent],
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  private searchService = inject(SearchService);
  private paginatedListService = inject(PaginatedListService<Artist>);
  destroy = inject(DestroyRef);
  inject = inject(Injector);

  displayedArtists = this.paginatedListService.displayedItems;
  currentPage = this.paginatedListService.currentPage;
  totalPages = this.paginatedListService.totalPages;
  loading = this.paginatedListService.loading;
  identify = (index: number, item: Artist) => item.id;

  skeletonArray = Array(12);  
  
  ngOnInit(): void {
    this.loading.set(true);
    this.paginatedListService.resetParams();
    this.listenerSearchTerm();
  }

  private listenerSearchTerm(): void {
    runInInjectionContext(this.inject, () => {
      this.searchService.searchTerm$
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe((searchTerm: string) => {
          this.paginatedListService.resetParams();
          this.paginatedListService.setSearchTerm(searchTerm.trim() !== '' ? searchTerm : 'artist');
          this.paginatedListService.loadNextPage('artist');
        });
    })
  }

  loadNextPage(): void {
    this.paginatedListService.loadNextPage('artist');
  }

  loadPreviousPage(): void {
    this.paginatedListService.loadPreviousPage();
  }
}