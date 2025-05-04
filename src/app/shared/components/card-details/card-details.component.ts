import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Artist, Album, listType } from '@shared/models';
import { FollowersPipe } from '@shared/pipes/followers.pipe';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, FollowersPipe],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent {
  @Input() data!: Partial<Artist & Album>;
  @Input() type!: listType;
}
