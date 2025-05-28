
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-category',
   standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit {

//  categoryId: string = '';
//   category: any = { name: '', image: '' };
//   selectedFile: File | null = null;
//   imagePreview: string | ArrayBuffer | null = null;

//   constructor(
//     private _ActivatedRoute: ActivatedRoute,
//     private router: Router,
//     private categoryService: CategoryService, private _ToastrService:ToastrService
//   ) {}

//   ngOnInit(): void {
//    const id  = this._ActivatedRoute.snapshot.paramMap.get('id');
//    console.log('Category ID from route:', id);


//    if(id){
//     this.categoryId = id;
//       this.categoryService.getCategoryById(this.categoryId).subscribe({
//       next: (data: any) => {
//         console.log('Category data:', data);

        
//         this.category = data.model;
//         console.log('Category model:', this.category);
   
//         this.imagePreview = data.model.image || 'assets/placeholder-image.png';
//       },
//       error: (err) => {
//         console.error('Error loading category:', err);
//         // Optionally redirect
//         // this.router.navigate(['/categories']);
//       }
//     });


//    }

//   }



//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imagePreview = reader.result;
//       };
//       reader.readAsDataURL(this.selectedFile);
//     }
//   }

// // updateCategory(): void {
// //   const formData = new FormData();

 
// //   formData.append('Id', this.categoryId); 
// //   formData.append('Name', this.category.name); 

// //   if (this.selectedFile) {
// //     formData.append('Image', this.selectedFile, this.selectedFile.name); 
// //   }

// //   this.categoryService.updateCategory(this.categoryId, formData).subscribe({
// //     next: () => {
// //       this._ToastrService.success('Category updated successfully');
// //       this.router.navigate(['/dashboard/ViewAllCategory']);
// //     },
// //     error: (err) => {
// //       this._ToastrService.error('Error updating category');
// //       console.error('Error updating category:', err);
// //     }
// //   });
// // }


// updateCategory(): void {
//   const formData = new FormData();


//   formData.append('name', this.category.name);


//   if (this.selectedFile) {
//     formData.append('image', this.selectedFile, this.selectedFile.name);
//   }

//   this.categoryService.updateCategory(this.categoryId, formData).subscribe({
//     next: () => {
//       this._ToastrService.success('Category updated successfully');
//       this.router.navigate(['/dashboard/ViewAllCategory']);
//     },
//     error: (err) => {
//       this._ToastrService.error('Error updating category');
//       console.error('Error updating category:', err);
//     }
//   });
// }

 categoryId: number = 0;
  category: any = {
    name: '',
    image: ''
  };
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('id')!;
      this.loadCategory();
    });
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.categoryId.toString()).subscribe({
      next: (res) => {
        console.log('Category data:', res);
        
        this.category = res.model;
        this.imagePreview = res.image;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  updateCategory(): void {
    const formData = new FormData();
    formData.append('Id', this.categoryId.toString());
    formData.append('Name', this.category.name);

    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    }

    this.categoryService.updateCategory(this.categoryId.toString(), formData).subscribe({
      next: () => {
        this.toastr.success('Category updated successfully');
        this.router.navigate(['/dashboard/ViewAllCategory']);
      },
      error: (err) => {
        this.toastr.error('Failed to update category');
        console.error(err);
      }
    });
  }






}




