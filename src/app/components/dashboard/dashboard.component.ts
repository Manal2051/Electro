

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';


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

   readonly _AuthServiceService=inject(AuthServiceService);

 

}
