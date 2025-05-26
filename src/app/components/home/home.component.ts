import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../services/products-service.service';
import { IProduct } from '../../Interfaces/iproduct';

import{CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,FormsModule,CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {



  _ProductsServiceService=inject(ProductsServiceService);
  _ToastrService=inject(ToastrService);
  _NgxSpinnerService=inject(NgxSpinnerService);
  productsList:IProduct[]=[];
  GetAllProductSub !:Subscription;
categoryList!:[];
  ngOnInit(): void {
    //this._NgxSpinnerService.show('load1');
   this.GetAllProductSub= this._ProductsServiceService.getAllProduct(1,8).subscribe({
      next:(res)=>{
        // this._ToastrService.info(res.model);
        this.productsList=res.model.items;
     //   this._NgxSpinnerService.hide('load1');
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
}
