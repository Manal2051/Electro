

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarActive = false;


 

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }


  isProductsSubmenuOpen = false;

  toggleProductsSubmenu() {
    this.isProductsSubmenuOpen = !this.isProductsSubmenuOpen;
  }

 

}
