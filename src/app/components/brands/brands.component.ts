import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductsServiceService } from '../../services/products-service.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ICategory } from '../../Interfaces/icategory';
import { BrandService } from '../../services/brand.service';
import { SearchPipe } from '../../pipes/search.pipe';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, FormsModule, RouterLink, SearchPipe, CurrencyPipe],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, OnDestroy {

  _searchName: string = "";
  brandList: ICategory[] = [];
  filteredProducts: IProduct[] = [];
  GetAllProductSub?: Subscription;
  GetAllBrandSub!: Subscription;

  _ProductsServiceService = inject(ProductsServiceService);
  _CartService = inject(CartService);
  _BrandService = inject(BrandService);
  _ToastrService = inject(ToastrService);
  _SharedDataService = inject(SharedDataService);

  @Output() dataFromChild = new EventEmitter<number>();
  counter: number = 0;

  ngOnInit(): void {
    this.GetAllBrandSub = this._BrandService.getAllBrand().subscribe({
      next: (res) => {
        this.brandList = res.model;
        console.log("Brands:", res.model);
      }
    });
  }

  filterProducts(name: string | null): void {
    if (!name) {
      this.GetAllProductSub = this._ProductsServiceService.getAllProduct(1, 9).subscribe({
        next: (res) => this.filteredProducts = res.model.slice(0, 9)
      });
    } else {
      this.GetAllProductSub = this._ProductsServiceService.GetProductByBrandName(name).subscribe({
        next: (res) => this.filteredProducts = res.model.slice(0, 9)
      });
    }
  }

  onBrandChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filterProducts(value);
  }

  addToCart(qu: number, id: number): void {
    this._CartService.addItemToCart(qu, id).subscribe({
      next: () => {
        this._ToastrService.success('Product Added To Cart Successfully');
        this.counter += 1;
        this.dataFromChild.emit(this.counter);
        this._CartService.refreshCartCount(); // ✅ الأفضل استخدام هذه الطريقة
      },
      error: (err) => {
        console.error("Add to cart error", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.GetAllProductSub?.unsubscribe();
    this.GetAllBrandSub?.unsubscribe();
  }
}
