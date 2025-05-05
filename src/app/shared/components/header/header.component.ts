import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SearchService } from '@shared/services/search.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  detailsRoute = signal(false);
  user: Partial<User> | null = null;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.listenerRouterEvents();
    this.listenerUser();
  }

  listenerRouterEvents() {
    this.router.events.subscribe(() => {
      const childRoute = this.route.firstChild;
      this.detailsRoute.set(!!childRoute?.snapshot.paramMap.get('id'));
    });
  }

  listenerUser() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  onSearch(searchTerm: string) {
    this.searchService.updateSearchTerm(searchTerm);
  }

  goBack() {
    this.location.back();
  }
}
