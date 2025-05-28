import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsServiceService } from '../../services/products-service.service';
import { IProduct } from '../../Interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true, // مهم للـ standalone component
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'] // تمت التصحيح هنا
})
export class DetailsComponent implements OnInit {
  private _ActivatedRoute = inject(ActivatedRoute);
  private _ProductsServiceService = inject(ProductsServiceService);
  _CartService=inject(CartService);
  _ToastrService=inject(ToastrService);

  detailsProduct: IProduct | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        const productName = params.get('name');
        console.log(productName);

        if (productName) {
          this._ProductsServiceService.getProductByName(productName).subscribe({
            next: (res) => {
              this.detailsProduct = res.model;
              console.log(this.detailsProduct);
            },
            error: (err) => {
              console.error('Error fetching product:', err);
            }
          });
        }
      }
    });
  }
   addToCart(qu:number,id:number):void{
this._CartService.addItemToCart(qu,id).subscribe({
  next:(res)=>{
    this._ToastrService.success('Product Added To Cart Successfully');
console.log(res);
  },
  error:(err)=>{
    console.log(err);


  }
})

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
}
