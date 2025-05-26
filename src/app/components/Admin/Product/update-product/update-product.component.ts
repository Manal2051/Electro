import { Component } from '@angular/core';
import { Ibrand } from '../../../../Interfaces/ibrand';
import { ICategory } from '../../../../Interfaces/icategory';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../../services/products-service.service';

import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../../services/category.service';
import { BrandService } from '../../../../services/brand.service';
import { IProduct } from '../../../../Interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

   productId: string = '';
  product: IProduct = {
    imageUrl: '',
    id: 0,
    name: '',
    description: '',
    price: 0,
    stockAmount: 0,
    discountPercentage: 0,
    image: '',
    categoryName: '',
    brandName: '',
    categoryId: 0,
    brandId: 0
  };
  
  categories: ICategory[] = [];
  brands: Ibrand[] = [];
  isLoading: boolean = true;
  toastr: any;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsServiceService: ProductsServiceService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService
  ) { }

  ngOnInit(): void {
    console.log('Component initialized');
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    console.log('Product ID from route:', id);
    
    if (id) {
      this.productId = id;
         console.log('Loading product data for ID:', this.productId);
    
    this._ProductsServiceService.getProductById(this.productId).subscribe({
      next: (response:any) => {
        console.log('Raw product data received:', response);
        const foundProduct = response.model;
        console.log('Found product:', foundProduct);
        
        if (foundProduct) {
          // Direct assignment to ensure all properties are copied
          this.product.id = foundProduct.id || 0;
          this.product.name = foundProduct.name || '';
          this.product.description = foundProduct.description || '';
          this.product.price = foundProduct.price || 0;
          this.product.stockAmount = foundProduct.stockAmount || 0;
          this.product.discountPercentage = foundProduct.discountPercentage || 0;
          this.product.imageUrl = foundProduct.imageUrl || '';
          this.product.image = foundProduct.image || '';
          this.product.categoryId = foundProduct.categoryId || 0;
          this.product.brandId = foundProduct.brandId || 0;
          this.product.categoryName = foundProduct.categoryName || '';
          this.product.brandName = foundProduct.brandName || '';
          
          console.log('Product after assignment:', this.product);

          
          // Load categories and brands after product is loaded
          this.loadCategories();
          this.loadBrands();
          
          this.isLoading = false;
        } else {
          console.error('Product not found');
          this._ToastrService.error('Product not found');
          this._Router.navigate(['/dashboard/ViewAllProducts']);
        }
      },
      error: (err: any) => {
        console.error('Error fetching product:', err);
        this._ToastrService.error('Error loading product data');
        this.isLoading = false;
      }
    });

  
    }
  }




  loadCategories() {
    this._CategoryService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res.model;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Failed to load categories');
        this.isLoading = false;
        console.log('Error loading categories:', err);
      }
    });
  }

  loadBrands() {
    this._BrandService.getAllBrand().subscribe({
      next: (res) => {
        this.brands = res.model;
      },
      error: (err) => {
        this.toastr.error('Failed to load brands');
        console.log('Error loading brands:', err);
      }
    });
  }

  updateProduct() {
    console.log('Updating product:', this.product);
    
    this._ProductsServiceService.updateProduct( this.product).subscribe({
      next: () => {
        this._ToastrService.success('Product updated successfully!');
        this._Router.navigate(['/dashboard/ViewAllProducts']);
      },
      error: (err: any) => {
        console.error('Error updating product:', err);
        this._ToastrService.error('Error updating product');
      }
    });
  }

  // Simple debug method to check current product state
  debugProduct() {
    console.log('Current product state:', this.product);
  }

}
