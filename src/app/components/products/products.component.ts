import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductsServiceService } from '../../services/products-service.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [FormsModule,SearchPipe,RouterLink,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit ,OnDestroy {

  _searchName:string ="";
  _searchBrand:string="";


    _ProductsServiceService=inject(ProductsServiceService);
    productsList:IProduct[]=[];
    GetAllProductSub !:Subscription;

    ngOnInit(): void {
     this.GetAllProductSub= this._ProductsServiceService.getAllProduct(1,8).subscribe({
        next:(res)=>{
          this.productsList=res.model.items;
          console.log(res.model.items);
        },
        error:(err)=>{
          console.log(err);
        }
      })

    }

     ngOnDestroy(): void {
      this.GetAllProductSub?.unsubscribe();

    }

}
