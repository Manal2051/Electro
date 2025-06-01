import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {
  constructor(private location: Location) {}
  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }
}
