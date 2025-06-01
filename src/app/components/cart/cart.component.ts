import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../Interfaces/cart-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  _ToastrService = inject(ToastrService);
  _CartService = inject(CartService);
  CartDetails: CartItem[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this._CartService.getCartItems().subscribe({
      next: (res) => {
        this.CartDetails = res.model;
      },
      error: (err) => {
        console.error("Error loading cart items", err);
      }
    });
  }

  addToCart(qu: number, id: number): void {
    this._CartService.addItemToCart(qu, id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product added to cart successfully');
        this._CartService.refreshCartCount(); // تحديث العدد تلقائي
        this.loadCartItems(); // تحديث العناصر بعد الإضافة
      },
      error: (err) => {
        console.error("Error adding item", err);
      }
    });
  }

  onDelete(item: CartItem): void {
    this._CartService.DeleteItem(item.id).subscribe({
      next: () => {
        this.CartDetails = this.CartDetails.filter(c => c.id !== item.id);
        this._ToastrService.success('Item deleted from your cart');
        this._CartService.refreshCartCount(); // تحديث العدد بعد الحذف
      },
      error: (err) => {
        console.error("Error deleting item", err);
      }
    });
  }

  increaseQuantity(item: CartItem): void {
    const newQuantity = item.quantity + 1;
    this.updateItemQuantity(item, newQuantity);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.updateItemQuantity(item, newQuantity);
    }
  }

  updateItemQuantity(item: CartItem, quantity: number): void {
    const updatedItem = { ...item, quantity };
    this._CartService.updateItem(item.id, updatedItem).subscribe({
      next: () => {
        item.quantity = quantity;
        this._ToastrService.success('Item quantity updated successfully');
      },
      error: (err) => {
        console.error("Error updating quantity", err);
        this._ToastrService.error('Failed to update quantity');
      }
    });
  }
}
