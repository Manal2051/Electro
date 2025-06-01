import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductsServiceService } from '../../services/products-service.service';
import { IProduct } from '../../Interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
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
  imports: [CarouselModule, RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private _ToastrService = inject(ToastrService);
  private _ProductsService = inject(ProductsServiceService);
  private _Spinner = inject(NgxSpinnerService);
  private _CartService = inject(CartService);
  private _SharedDataService = inject(SharedDataService);

  @Output() dataFromChild = new EventEmitter<number>();

  productsList: IProduct[] = [];
  GetAllProductSub!: Subscription;

  ngOnInit(): void {
    this.GetAllProductSub = this._ProductsService.getAllProduct(1, 8).subscribe({
      next: (res) => {
        this.productsList = res.model.items;
      },
      error: (err) => {
        console.error("Error loading products", err);
      }
    });

    // تحديث العدد أول ما الصفحة تفتح
    this._CartService.refreshCartCount();
  }

  ngOnDestroy(): void {
    this.GetAllProductSub?.unsubscribe();
  }

  addToCart(quantity: number, productId: number): void {
    this._CartService.addItemToCart(quantity, productId).subscribe({
      next: () => {
        this._ToastrService.success('Product added to cart successfully');
        // التحديث يتم تلقائيًا من خلال refreshCartCount داخل CartService
      },
      error: (err) => {
        console.error("Error adding product to cart", err);
      }
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      500: { items: 1 },
      740: { items: 1 },
      940: { items: 1 }
    },
    nav: true
  };
}
