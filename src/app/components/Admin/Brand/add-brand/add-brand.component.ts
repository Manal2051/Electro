import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandService } from '../../../../services/brand.service';
import { CommonModule } from '@angular/common';
import { Ibrand } from '../../../../Interfaces/ibrand';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-brand',
  imports: [CommonModule , FormsModule,ReactiveFormsModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.scss'
})
export class AddBrandComponent {
   @Output() brandAdded = new EventEmitter<void>();
 isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private _BrandService: BrandService,private _ToastrService:ToastrService) {}

  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),
    email: new FormControl('', [Validators.required])
  });

  get name() { return this.brandForm.get('name'); }
  get phone() { return this.brandForm.get('phone'); }
  get email() { return this.brandForm.get('email'); }



 

addBrand() {
      this.markFormGroupTouched();
  if (this.brandForm.status === 'VALID') {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';


    const brandData: Ibrand = {
      id:0,
      name: this.brandForm.value.name!,
      phone: this.brandForm.value.phone!,
      email: this.brandForm.value.email!
    };

    this._BrandService.addBrand(brandData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Brand added successfully!';
        this._ToastrService.success('Brand added successfully!');
        this.brandAdded.emit(); 

        this.brandForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Failed to add brand. Please try again.';
       this._ToastrService.error('Failed to add brand!');
      }
    });
  } 
}


  resetForm() {
    this.brandForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.brandForm.controls).forEach(key => {
      const control = this.brandForm.get(key);
      control?.markAsTouched();
    });
  }




}
