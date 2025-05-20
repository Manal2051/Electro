import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';


@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterOutlet,DashboardComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

}
