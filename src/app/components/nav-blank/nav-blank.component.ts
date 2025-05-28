import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

 sharedData=inject(SharedDataService);
  cartCounter: number = 0; 
  ngOnInit(): void {
    this.sharedData.cartCount$.subscribe(count => {
    this.cartCounter = count;
  });
  }

  readonly _AuthServiceService=inject(AuthServiceService);


  // logout():void{
  //   this._AuthServiceService.sinOut();
  // }

}
