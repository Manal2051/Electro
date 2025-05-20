import { IProduct } from './../../../../Interfaces/iproduct';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsServiceService } from '../../../../services/products-service.service';
import { Router } from 'express';



@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent {

  // productId:number=0;
  // product!:IProduct 

  // constructor(private _ActivatedRoute:ActivatedRoute ,private _ProductsServiceService:ProductsServiceService,private _Router:Router){}

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.

  //    const id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));

  //   if (id) {
  //     this.productId = id;

  //        this._ProductsServiceService.getById(this.productId).subscribe({
  //       next: (foundProduct) => {
  //         if (foundProduct) {
  //           this.product = { ...foundProduct };
  //         } else {
  //           console.error('Product not found');
          
  //         }
  //       }
  //     });

    
  //   } 
    
 // }

}
