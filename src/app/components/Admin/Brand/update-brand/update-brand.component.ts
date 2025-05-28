import { Component, OnInit } from '@angular/core';
import { Ibrand } from '../../../../Interfaces/ibrand';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../../services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-brand',
  imports: [CommonModule,FormsModule],
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.scss'
})
export class UpdateBrandComponent implements OnInit {
  BrandId: number = 0;
  brand: Ibrand = { id: 0, name: '', phone: '', email: '' };

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _BrandService: BrandService,
    private _Router: Router , private _ToastrService:ToastrService
  ) { }

  ngOnInit(): void {
    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    console.log('Brand ID from route:', id);
    if (id) {
      this.BrandId = +id;

      this.loadBrandData();
    }
  }

  loadBrandData(): void {
    this._BrandService.getBrandById(this.BrandId).subscribe({
      next: (data: any) => {
        this.brand = data.model;
        console.log('Brand loaded:', this.brand);
      },
      error: (err) => {
        console.error('Error loading brand:', err);
      }
    });
  }


  updateBrand(): void {
    if (this.brand) {
      this._BrandService.updateBrand(this.BrandId, this.brand).subscribe({
        next: () => {
          console.log('Brand updated successfully');
          this._ToastrService.success('Brand updated successfully');
          this._Router.navigate(['/dashboard/ViewAllBrands']); 
        },
        error: (err) => {
          console.error('Error updating brand:', err);
          this._ToastrService.error('Error updating brand');
        }
      });
    }
  }




 



}
