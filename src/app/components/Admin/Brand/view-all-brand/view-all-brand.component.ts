import { BrandService } from './../../../../services/brand.service';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';
import { Ibrand } from '../../../../Interfaces/ibrand';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AddBrandComponent } from "../add-brand/add-brand.component";

@Component({
  selector: 'app-view-all-brand',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule, AddBrandComponent],
  templateUrl: './view-all-brand.component.html',
  styleUrl: './view-all-brand.component.css'
})
export class ViewAllBrandComponent {

  brandList: Ibrand[] = [];
  filterBrand:Ibrand[]=[];
  searchTerm:string ='';


  isLoading = true;
  errorMessage = '';

  constructor(private _BrandService:BrandService, private _ToastrService: ToastrService

  ) {}

  ngOnInit(): void {
      this.loadBrands();
  }

    private loadBrands() {
    this.isLoading = true;
    this._BrandService.getAllBrand().subscribe({
      next: (res) => {
        this.brandList = res.model;
        this.filterBrand = [...this.brandList];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load brands. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching brands:', err);
      }
    });
  }

  filterBrands()
  {
    this.filterBrand = this.brandList.filter(
      brand => brand.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }


deleteBrand(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this brand!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this._BrandService.deleteBrand(id).subscribe({
        next: () => {
          this._ToastrService.success('Brand deleted successfully');
          this.loadBrands(); 
        },
        error: (err) => {
          
          if (err.status === 400) {
            this._ToastrService.error(err.error); 
          } else {
            this._ToastrService.error('Failed to delete brand');
          }
          console.error('Delete error:', err);
        }
      });
    }
  });
}


}
