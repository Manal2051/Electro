import { CategoryService } from './../../../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsServiceService } from '../../../../services/products-service.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../../../Interfaces/icategory';
import { BrandService } from '../../../../services/brand.service';
import { Ibrand } from '../../../../Interfaces/ibrand';
import { EventEmitter } from '@angular/core';




@Component({
  selector: 'app-add-product',
  imports: [CommonModule , FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {

   @Output() productAdded = new EventEmitter<void>();

  selectedImage: string | ArrayBuffer | null = 'assets/addProd.png';
  selectedFiles: FileList | null = null;
  categoryList: ICategory[] = [];
  brandList: Ibrand[] = [];
  isLoading = true;
  isSubmitting = false;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    stockAmount: new FormControl('', [Validators.required, Validators.min(1)]),
    categoryId: new FormControl('', Validators.required),
    brandId: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    discountPercentage: new FormControl(0, [Validators.min(0), Validators.max(100)])
  });

  constructor(
    private productService: ProductsServiceService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        this.categoryList = res.model;
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
    this.brandService.getAllBrand().subscribe({
      next: (res) => {
        this.brandList = res.model;
      },
      error: (err) => {
        this.toastr.error('Failed to load brands');
        console.log('Error loading brands:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  addProduct() {
    this.productForm.markAllAsTouched();

    if (!this.productForm.valid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      this.toastr.error('Please select at least one image');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();


    formData.append('name', this.productForm.value.name!);
    formData.append('price', this.productForm.value.price!.toString());
    formData.append('stockAmount', this.productForm.value.stockAmount!.toString());
    formData.append('categoryId', this.productForm.value.categoryId!.toString());
    formData.append('brandId', this.productForm.value.brandId!.toString());
    formData.append('description', this.productForm.value.description!);
    formData.append('discountPercentage', (this.productForm.value.discountPercentage || 0).toString());

  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('imageFile', this.selectedFiles[i]);
    }

    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        this.toastr.success('Product added successfully');
         this.productAdded.emit();
        this.resetForm();
        this.router.navigate(['dashboard/ViewAllProducts']);
      },
      error: (err) => {
        let errorMsg = 'Failed to add product';
        
        if (err.status === 400) {
          errorMsg = 'Invalid data - please check all fields';
        } else if (err.status === 413) {
          errorMsg = 'File size too large';
        }
        
        this.toastr.error(errorMsg);
        this.isSubmitting = false;
        console.log('Error:', err);
      }
    });
  }

  resetForm() {
    this.productForm.reset();
    this.selectedFiles = null;
    this.selectedImage = 'assets/addProd.png';
    this.isSubmitting = false;
  }


  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get stockAmount() { return this.productForm.get('stockAmount'); }
  get categoryId() { return this.productForm.get('categoryId'); }
  get brandId() { return this.productForm.get('brandId'); }
  get description() { return this.productForm.get('description'); }
  get discountPercentage() { return this.productForm.get('discountPercentage'); }
}