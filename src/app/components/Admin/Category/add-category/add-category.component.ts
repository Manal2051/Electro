import { ToastrService } from 'ngx-toastr';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

   @Output() CategoryAdded = new EventEmitter<void>();

  selectedFile: File | null = null;
  selectedImagePreview: string | ArrayBuffer | null = null;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    imageFile: new FormControl(null, [Validators.required])
  });

  constructor(private _categoryService: CategoryService,private _ToastrService:ToastrService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.categoryForm.patchValue({ imageFile: file });
      
     
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addCategory() {
    if (this.categoryForm.valid && this.selectedFile) {
      this.isSubmitting = true;
      const formData = new FormData();
      
      formData.append('name', this.categoryForm.value.name!);
      formData.append('imageFile', this.selectedFile);

      this._categoryService.addCategory(formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = 'Category added successfully!';
          this._ToastrService.success('Category added successfully!')
          this.CategoryAdded.emit();
          this.resetForm();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.error?.message || 'Failed to add category';

        this._ToastrService.error('Failed to add category!')
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.categoryForm.reset();
    this.selectedFile = null;
    this.selectedImagePreview = null;
    this.errorMessage = '';
    this.successMessage = '';
  }

  get name() { return this.categoryForm.get('name'); }
  get imageFile() { return this.categoryForm.get('imageFile'); }

}
