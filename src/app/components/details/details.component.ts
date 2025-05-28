import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsServiceService } from '../../services/products-service.service';
import { IProduct } from '../../Interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent  {
  private readonly _ActivatedRoute=inject(ActivatedRoute);

 private readonly _ProductsServiceService=inject(ProductsServiceService);

 detailsProduct:IProduct|null=null;

  // ngOnInit(): void {
  //   this._ActivatedRoute.paramMap.subscribe({
  //     next:(p)=>{
  //       console.log(p.get('name'));
  //       let ProductName=p.get('name');
  //       this._ProductsServiceService.getProductByName(ProductName).subscribe({
  //         next:(res)=>{

  //           this.detailsProduct=res.model;
  //           console.log(this.detailsProduct);

        //   },


          
        //   error:(err)=>{
        //    console.log(err);
        //   }
        // })


  //     }
  //   })

  // }

}
