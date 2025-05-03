import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-header',
  standalone: true,
  imports: [],
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
