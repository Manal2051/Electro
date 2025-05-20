import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../services/products-service.service';
import { IProduct } from '../../Interfaces/iproduct';

import{CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,FormsModule,CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {



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

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
     items: 1,
    nav: true
  }

   ngOnDestroy(): void {
    this.GetAllProductSub?.unsubscribe();

  }
}
