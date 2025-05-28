import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';
import { ProductsServiceService } from '../../../../services/products-service.service';
import { IProduct } from '../../../../Interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddProductComponent } from "../add-product/add-product.component";
import { UpdateProductComponent } from "../update-product/update-product.component";

@Component({
  selector: 'app-view-all-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink, AddProductComponent],
  templateUrl: './view-all-products.component.html',
  styleUrl: './view-all-products.component.css'
})
export class ViewAllProductsComponent implements OnInit {

  constructor(private _ProductsServiceService:ProductsServiceService,private _ToastrService:ToastrService){}

   productsList:IProduct[]=[];
  filteredProducts: IProduct[] = [];

  searchTerm:string ='';


  isLoading = true;
  errorMessage = '';
  

  ngOnInit(): void {
    this.loadProduct();
  
  }

  loadProduct(){
      this.isLoading = true;
    this._ProductsServiceService.getAllProduct(1,20).subscribe({
      next:(res)=>{
        this.productsList=res.model.items;
        this.filteredProducts =[...this.productsList]
        this.isLoading = false
        console.log(res.model.items);
      },
      error:(err)=>{
        console.log(err);
        this.errorMessage = 'Failed to load product. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching product:', err);
      }
    })
  }

  OnProductAdded(){
    this.loadProduct();
  }

    filterProducts()
  {
    this.filteredProducts = this.productsList.filter(
      product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }


  deleteProduct(productId: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You wont to delete this product !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this._ProductsServiceService.deleteProduct(productId).subscribe({
        next: () => {
        
          this._ProductsServiceService.getAllProduct(1, 20).subscribe({
            next: (res) => {
              this.productsList = res.model.items;
              this.filteredProducts = [...this.productsList];
              Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              );
             this._ToastrService.success('product deleted sussfully');
            },
            error: (refreshErr) => {
              this._ToastrService.error('Failed to refresh product list');
            }
          });
        },
        error: (err) => {
          Swal.fire(
            'Error!',
            'Failed to delete product.',
            'error'
          );
          console.error('Delete error:', err);
        }
      });
    }
  });
}


 
 

    



}
