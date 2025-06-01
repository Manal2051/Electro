import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ICategory } from '../../Interfaces/icategory';
import { ProductsServiceService } from '../../services/products-service.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { SharedDataService } from '../../services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CarouselModule,
    FormsModule,
    SearchPipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  _searchName: string = "";
  categoryName: string = "";
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  pages: number[] = [];

  _CategoryService = inject(CategoryService);
  _ProductsServiceService = inject(ProductsServiceService);
  _CartService = inject(CartService);
  _ToastrService = inject(ToastrService);
  _SharedDataService = inject(SharedDataService);

  @Output() dataFromChild = new EventEmitter<number>();

  productsList: IProduct[] = [];
  categoryList: ICategory[] = [];

  GetAllProductSub!: Subscription;
  GetAllCategorySub!: Subscription;

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      500: { items: 2 },
      740: { items: 3 },
      940: { items: 6 }
    },
    nav: false
  };

  ngOnInit(): void {
    this.GetAllCategorySub = this._CategoryService.getAllCategory().subscribe({
      next: (res) => {
        this.categoryList = res.model;
      },
      error: (err) => {
        console.error("Error loading categories", err);
      }
    });

    this.loadProducts(this.currentPage);
    this._CartService.refreshCartCount();
  }

  loadProducts(page: number): void {
    this.GetAllProductSub = this._ProductsServiceService.getAllProduct(page, this.pageSize).subscribe({
      next: (res) => {
        this.productsList = res.model.items;
        this.totalPages = res.model.totalPages;
        this.currentPage = page;
        this.generatePages();
      },
      error: (err) => {
        console.error("Error loading products", err);
      }
    });
  }

  generatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  addToCart(qu: number, id: number): void {
    this._CartService.addItemToCart(qu, id).subscribe({
      next: () => {
        this._ToastrService.success('Product added to cart successfully');
        // تم التحديث تلقائياً من خلال refreshCartCount في CartService
      },
      error: (err) => {
        console.error("Error adding product to cart", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.GetAllProductSub?.unsubscribe();
    this.GetAllCategorySub?.unsubscribe();
  }
}
