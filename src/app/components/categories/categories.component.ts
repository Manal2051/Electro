import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ICategory } from '../../Interfaces/icategory';
import { ProductsServiceService } from '../../services/products-service.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/shared-data.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categoryList: ICategory[] = [];
  filteredProducts: IProduct[] = [];
  GetAllProductSub?: Subscription;
  GetAllCategorySub!: Subscription;

  _ProductsServiceService = inject(ProductsServiceService);
  _CartService = inject(CartService);
  _ToastrService = inject(ToastrService);
  _CategoryService = inject(CategoryService);
  _SharedDataService = inject(SharedDataService);

  @Output() dataFromChild = new EventEmitter<number>();
  counter: number = 0;

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
        console.log("Categories:", res.model);
      }
    });
  }

  filterProducts(name: string | null): void {
    this.GetAllProductSub = this._ProductsServiceService.GetProductByCategoryName(name).subscribe({
      next: (res) => {
        this.filteredProducts = res.model.slice(0, 9);
      }
    });
  }

  addToCart(qu: number, id: number): void {
    this._CartService.addItemToCart(qu, id).subscribe({
      next: () => {
        this._ToastrService.success('Product Added To Cart Successfully');
        this.counter += 1;
        this.dataFromChild.emit(this.counter);
        this._CartService.refreshCartCount(); // ✅ التحديث الصحيح للعداد
      },
      error: (err) => {
        console.error("Add to cart error", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.GetAllProductSub?.unsubscribe();
    this.GetAllCategorySub?.unsubscribe();
  }
}
