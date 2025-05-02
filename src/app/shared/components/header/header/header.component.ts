import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '@shared/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchService = inject(SearchService);
  onSearch(searchTerm: string) {
    this.searchService.updateSearchTerm(searchTerm);
  }
}
