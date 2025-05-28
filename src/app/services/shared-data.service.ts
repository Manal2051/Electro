import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
    private cartCount = new BehaviorSubject<number>(this.getInitialCartCount());
  cartCount$ = this.cartCount.asObservable();

  private getInitialCartCount(): number {
    const stored = localStorage.getItem('cartCounter');
    return stored ? +stored : 0;
  }

  updateCartCount(count: number) {
    localStorage.setItem('cartCounter', count.toString()); // 👈 حفظ في التخزين المحلي
    this.cartCount.next(count);
  }

  clearCartCount() {
    localStorage.removeItem('cartCounter');
    this.cartCount.next(0);
  }
//  private cartCount = new BehaviorSubject<number>(0);
//   cartCount$ = this.cartCount.asObservable();

//   updateCartCount(count: number) {
//     this.cartCount.next(count);
//   }
  constructor() { }
}
