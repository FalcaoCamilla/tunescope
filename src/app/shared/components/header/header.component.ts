import { Component, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SearchService } from '@shared/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  detailsRoute = signal(false);

  constructor(
    private location: Location,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      const childRoute = this.route.firstChild;
      this.detailsRoute.set(!!childRoute?.snapshot.paramMap.get('id'));
    });
  }

  onSearch(searchTerm: string) {
    this.searchService.updateSearchTerm(searchTerm);
  }

  goBack() {
    this.location.back();
  }
}
