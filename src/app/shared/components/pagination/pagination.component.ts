import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() nextPage = new EventEmitter<void>();
  @Output() previousPage = new EventEmitter<void>();
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) this.nextPage.emit();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) this.previousPage.emit(); 
  }
}