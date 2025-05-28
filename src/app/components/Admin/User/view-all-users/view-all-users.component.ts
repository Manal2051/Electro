
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { Iuser } from '../../../../Interfaces/iuser';


@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css'
})
export class ViewAllUsersComponent  {

  
 users: Iuser[] = [];
  isLoading = false;
  errorMessage = '';
  totalUsers = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        if (response.isSucceeded && response.model) {
          this.users = response.model;
          this.totalUsers = this.users.length;
        } else {
          this.errorMessage = response.message || 'Failed to load users data';
          this.users = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Failed to load users. Please try again later.';
        this.users = [];
        this.isLoading = false;
      }
    });
  }

  refreshUsers(): void {
    this.loadAllUsers();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getDisplayPhoneNumber(phoneNumber: string ): string {
    return phoneNumber ;
  }
  




}
