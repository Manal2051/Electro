
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ProductsServiceService } from '../../../../services/products-service.service';
import { IProduct } from '../../../../Interfaces/iproduct';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-products',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './view-all-products.component.html',
  styleUrl: './view-all-products.component.css'
})
export class ViewAllProductsComponent implements OnInit {

  constructor(private _ProductsServiceService:ProductsServiceService){}

   productsList:IProduct[]=[];
  filteredProducts: IProduct[] = [];

  searchTerm:string ='';

  ngOnInit(): void {
    this._ProductsServiceService.getAllProduct(1,12).subscribe({
      next:(res)=>{
        this.productsList=res.model.items;
        this.filteredProducts =[...this.productsList]
        console.log(res.model.items);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

    filterProducts()
  {
    this.filteredProducts = this.productsList.filter(
      product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }


  delete(){
    this._ProductsServiceService
  }
  

  


}
