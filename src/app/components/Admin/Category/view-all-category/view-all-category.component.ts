

import { Component } from '@angular/core';

import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import { ICategory } from '../../../../Interfaces/icategory';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddCategoryComponent } from "../add-category/add-category.component";
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-all-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink, AddCategoryComponent],
  templateUrl: './view-all-category.component.html',
  styleUrl: './view-all-category.component.css'
})
export class ViewAllCategoryComponent {



  categoryList: ICategory[] = [];
  filterCategory: ICategory[] = [];
  searchTerm:string ='';
  isLoading = true;
  errorMessage = '';

  constructor(private _CategoryService: CategoryService, private _ToastrService:ToastrService) {}

  ngOnInit(): void {
    this.loadCategories();

  }

  loadCategories() {
        this._CategoryService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res.model)
        this.categoryList = res.model;
        this.isLoading = false;
        this.filterCategory = [...this.categoryList]
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching categories:', err);
      }
    });
  }

  OnCategoryAdded(): void {
    this.loadCategories(); 
  }



  filterCategorys()
  {
    this.filterCategory = this.categoryList.filter(
      brand => brand.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

 
deleteCategory(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this._CategoryService.deleteCategory(id).subscribe({
        next: () => {
          this.categoryList = this.categoryList.filter(c => c.id !== id);
          this.filterCategory = this.filterCategory.filter(c => c.id !== id);
          this._ToastrService.success('category deleted successfully');
    
        },
        error: (err) => {
       
          if (err.status === 400) {
             this._ToastrService.error('Cannot delete category because there are products associated with it');
        
          } else { 
              this._ToastrService.error('Failed to delete category');
       
          }
          console.error('Delete error:', err);
        }
      });
    }
  });
}



}
