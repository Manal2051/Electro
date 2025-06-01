import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _CartService = inject(CartService);

  cartCount$ = this._CartService.cartCount$; // ربط مباشر بالـ BehaviorSubject في CartService

  constructor() {
    this._CartService.refreshCartCount(); // تحميل أولي لعدد العناصر عند إنشاء الخدمة
  }
}
