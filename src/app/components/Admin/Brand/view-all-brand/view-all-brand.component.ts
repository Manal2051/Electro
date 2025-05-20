import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all-brand',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './view-all-brand.component.html',
  styleUrl: './view-all-brand.component.css'
})
export class ViewAllBrandComponent {



}
