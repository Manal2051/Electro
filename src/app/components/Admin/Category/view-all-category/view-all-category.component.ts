

import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-all-category.component.html',
  styleUrl: './view-all-category.component.css'
})
export class ViewAllCategoryComponent {

  // constructor(private _CategoryService:CategoryService){}

  // categoyList:Icategory[]=[];

  
  // ngOnInit(): void {
  //    this._CategoryService.getAllCategory().subscribe({
  //     next:(response)=>{
  //       console.log("obj category",response)
  //       this.categoyList = response;
  //     }
     
  //    })
   
  // }




}
