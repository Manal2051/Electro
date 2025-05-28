
import { Component, OnInit } from '@angular/core';
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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  productId!: number;
  product: IProduct = {
    id: 0,
    name: '',
    price: 0,
    stockAmount: 0,
    discountPercentage: 0,
    categoryId: 0,
    brandId: 0,
    description: '',
    imageUrl: '',
    image: '',
    categoryName: '',
    brandName: ''
  };
  categories: ICategory[] = [];
  brands: Ibrand[] = [];
  isLoading: boolean = true;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsServiceService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    console.log("Route ID:", id);

    if (id) {
      this.productId = +id;
      console.log("Product ID:", this.productId);
      this.loadData();
    } else {
      this.toastr.error('Invalid product ID');
      this.router.navigate(['/products']);
    }
  }

  private loadData(): void {
    this.isLoading = true;
    
    forkJoin({
      product: this.productsService.getProductById(this.productId),
      categories: this.categoryService.getAllCategory(),
      brands: this.brandService.getAllBrand()
    }).subscribe({
      next: (response: any) => {
        console.log("Combined response:", response);

        // Handle product response
        if (response.product?.model) {
          this.product = { ...response.product.model };
        } else if (response.product) {
          this.product = { ...response.product };
        }

        // Handle categories response
        if (response.categories?.model) {
          this.categories = response.categories.model;
        } else if (Array.isArray(response.categories)) {
          this.categories = response.categories;
        }

        // Handle brands response
        if (response.brands?.model) {
          this.brands = response.brands.model;
        } else if (Array.isArray(response.brands)) {
          this.brands = response.brands;
        }

        console.log("Product loaded:", this.product);
        console.log("Categories loaded:", this.categories.length);
        console.log("Brands loaded:", this.brands.length);

        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading data:", error);
        this.toastr.error('Error loading product data');
        this.isLoading = false;
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.toastr.warning('Please fill in all required fields');
      return;
    }

    this.isLoading = true;

    // Try with image file first, then fallback to JSON-only update
    if (this.selectedFile) {
      console.log("Updating with new image file");
      this.updateWithFormData();
    } else {
      console.log("Updating without image file (JSON only)");
      this.updateWithJsonOnly();
    }
  }

  private updateWithFormData(): void {
    const formData = new FormData();
    
    // Use the exact field names your API expects
    formData.append('Id', this.product.id.toString());
    formData.append('Name', this.product.name.trim());
    formData.append('Price', this.product.price.toString());
    formData.append('StockAmount', this.product.stockAmount.toString());
    formData.append('DiscountPercentage', this.product.discountPercentage.toString());
    formData.append('CategoryId', this.product.categoryId.toString());
    formData.append('BrandId', this.product.brandId.toString());
    formData.append('Description', this.product.description.trim());
    
    // Add the image file if selected
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    }

    console.log("FormData contents:");
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(key, `File: ${value.name} (${value.size} bytes)`);
      } else {
        console.log(key, value);
      }
    });

    this.productsService.updateProduct(this.productId, formData).subscribe({
      next: (response: any) => {
        console.log("Update response:", response);
        this.toastr.success('Product updated successfully!');
        this.router.navigate(['/dashboard/ViewAllProducts']);
      },
      error: (error) => {
        console.error("FormData update failed:", error);
        this.handleUpdateError(error);
        // Fallback to JSON-only update
        this.updateWithJsonOnly();
      }
    });
  }

  private updateWithJsonOnly(): void {
    const productData = {
      id: this.product.id,
      name: this.product.name.trim(),
      price: this.product.price,
      stockAmount: this.product.stockAmount,
      discountPercentage: this.product.discountPercentage,
      categoryId: this.product.categoryId,
      brandId: this.product.brandId,
      description: this.product.description.trim()
    };

    console.log("JSON-only update payload:", productData);

    this.productsService.updateProductJson(this.productId, productData).subscribe({
      next: (response: any) => {
        console.log("JSON update response:", response);
        this.toastr.success('Product updated successfully!');
        this.router.navigate(['/dashboard/ViewAllProducts']);
      },
      error: (error) => {
        console.error("JSON update failed:", error);
        this.handleUpdateError(error);
        this.isLoading = false;
      }
    });
  }

  private handleUpdateError(error: any): void {
    console.error("Update error details:", error);
    
    let errorMessage = 'Failed to update product';
    
    if (error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error.errors) {
        // Handle validation errors
        const validationErrors = Object.values(error.error.errors).flat();
        errorMessage = validationErrors.join(', ');
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    this.toastr.error(errorMessage);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Please select a valid image file (JPEG, PNG, GIF)');
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.toastr.error('File size must be less than 5MB');
        return;
      }
      
      this.selectedFile = file;
      console.log("File selected:", file.name, file.size, file.type);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private isFormValid(): boolean {
    const requiredFields = {
      name: this.product.name?.trim(),
      price: this.product.price > 0,
      stockAmount: this.product.stockAmount >= 0,
      categoryId: this.product.categoryId > 0,
      brandId: this.product.brandId > 0,
      description: this.product.description?.trim()
    };
    
    const isValid = Object.values(requiredFields).every(field => !!field);
    
    console.log("Form validation:", requiredFields, "Valid:", isValid);
    
    return isValid;
  }

  logProductToConsole(): void {
    console.log("Current product state:", this.product);
    console.log("Selected file:", this.selectedFile);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/ViewAllProducts']);
  }
}

