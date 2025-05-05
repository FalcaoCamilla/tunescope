import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@shared/services/user.service';
import { Artist } from '@shared/models';
import { ListHeaderComponent } from '@shared/components/list-header/list-header.component';
import { SkeletonCardComponent } from '@shared/components/skeleton-card/skeleton-card.component';
import { finalize } from 'rxjs';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardComponent, ListHeaderComponent, SkeletonCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  private userService = inject(UserService);
  followedArtists = signal<Artist[]>([]);
  loading = signal(true);
  skeletonArray = Array(12);

  ngOnInit(): void {
    this.getFollowedArtists();
  }

  getFollowedArtists() {
    this.userService.getCurrentUserFavorites<Artist>({ listType: 'artist', limit: 50 })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.followedArtists.set(res.items);
        },
        error: (err) => {
          console.error('Error fetching followed artists:', err);
        }
      });
  }
}
