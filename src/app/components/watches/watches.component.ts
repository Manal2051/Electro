import { Component, inject, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../services/products-service.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IProduct } from '../../Interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-watches',
  imports: [RouterLink,RouterLinkActive,CurrencyPipe],
  templateUrl: './watches.component.html',
  styleUrl: './watches.component.scss'
})
export class WatchesComponent implements OnInit {

  _ProductsServiceService=inject(ProductsServiceService);
    private readonly _ActivatedRoute=inject(ActivatedRoute);
    Products:IProduct[]=[];
  GetAllProductSub: any;

  ngOnInit(): void {

this.GetAllProductSub= this._ProductsServiceService.GetProductByCategoryName("watches").subscribe({
      next:(res)=>{
        // this._ToastrService.info(res.model);
        this.Products=res.model.items;
     //   this._NgxSpinnerService.hide('load1');
        console.log(res.model.items);
      }
    })


    }

}

