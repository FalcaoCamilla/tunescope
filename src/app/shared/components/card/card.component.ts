import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist, listType } from '@shared/models';
import { Album } from '@shared/models/album';
import { Router } from '@angular/router';
import { FollowersPipe } from '@shared/pipes/followers.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FollowersPipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() data?: Partial<Artist & Album>;
  @Input() type?: listType;

  router = inject(Router);

  goToDetails(): void {
    if (this.type === 'artist') {
      this.router.navigate(['/artist', this.data?.id]);
    } else if (this.type === 'album') {
      this.router.navigate(['/album', this.data?.id]);
    }
  }
}
