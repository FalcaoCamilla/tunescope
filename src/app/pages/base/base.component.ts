import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsideComponent } from '@shared/components/aside/aside.component';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, RouterModule, AsideComponent, HeaderComponent],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

}
