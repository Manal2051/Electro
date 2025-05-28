import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductsServiceService } from '../../services/products-service.service';
import { IProduct } from '../../Interfaces/iproduct';

import{CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../services/cart.service';
import { SharedDataService } from '../../services/shared-data.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,FormsModule,CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {
  _ToastrService=inject(ToastrService);
  _ProductsServiceService=inject(ProductsServiceService);

  _NgxSpinnerService=inject(NgxSpinnerService);
  
_SharedDataService = inject(SharedDataService);

   @Output() dataFromChild = new EventEmitter<number>();
  counter:number=0;
  _CartService=inject(CartService);
  productsList:IProduct[]=[];
  GetAllProductSub !:Subscription;
categoryList!:[];
  ngOnInit(): void {
   
   this.GetAllProductSub= this._ProductsServiceService.getAllProduct(1,8).subscribe({
      next:(res)=>{
        this.productsList=res.model.items;
        console.log(res.model.items);
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
     responsive:{
      0:{
        items:1
      },
      500:{
        items:1
      },
      740:{
        items:1
      },940:{
        items:1
      }

      },

    nav: true
  }

   ngOnDestroy(): void {
    this.GetAllProductSub?.unsubscribe();

  }

  addToCart(qu:number,id:number):void{
this._CartService.addItemToCart(qu,id).subscribe({
  next:(res)=>{
    this._ToastrService.success('Product Added To Cart Successfully');
    this.counter += 1;
      this.dataFromChild.emit(this.counter);
      this._SharedDataService.updateCartCount(this.counter); 
    //  console.log('counter from home', res.model.length);
    

   

console.log('couter fron home',this.counter);
  },
  error:(err)=>{
    console.log(err);

  }
})

  }
}
