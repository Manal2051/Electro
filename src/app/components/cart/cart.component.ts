import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../Interfaces/cart-item';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

_ToastrService=inject(ToastrService);
  _CartService=inject(CartService);
  CartDetails: CartItem[] = [];
  sharedData=inject(SharedDataService);


  ngOnInit(): void {
    this._CartService.getCartItems().subscribe({
      next:(res)=>{
        console.log(res);
        this.CartDetails=res.model;
        console.log(res.model);

      },
      error:(err)=> {
        console.log(err);

      },
    })
  }

   addToCart(qu:number,id:number):void{
this._CartService.addItemToCart(qu,id).subscribe({
  next:(res)=>{
    this._ToastrService.success('Product Added To Cart Successfully');
console.log(res);
  },
  error:(err)=>{
    console.log(err);

  }
})

  }

  onDelete(item: CartItem) {
  this._CartService.DeleteItem(item.id).subscribe({
    next: (res) => {
      this.CartDetails = this.CartDetails.filter(c => c.id !== item.id);
this._ToastrService.success('Item Deleted form Your Cart');

      // 👇 تقليل العداد بمقدار quantity
      const quantity = item.quantity || 1;  // افتراضيًا 1 لو مش موجود
      const currentCount = Number(localStorage.getItem('cartCounter')) || 0;
      const newCount = currentCount > quantity ? currentCount - quantity : 0;

      this.sharedData.updateCartCount(newCount);
    },
    error: (err) => {
      console.log("from delete", err);
    }
  });
}
increaseQuantity(item: CartItem) {
  const newQuantity = item.quantity + 1;
  this.updateItemQuantity(item, newQuantity);
}

decreaseQuantity(item: CartItem) {
  if (item.quantity > 1) {
    const newQuantity = item.quantity - 1;
    this.updateItemQuantity(item, newQuantity);
  }
}
updateItemQuantity(item: CartItem, quantity: number) {
  const updatedItem = { ...item, quantity };

  this._CartService.updateItem(item.id, updatedItem).subscribe({
    next: (res) => {
      item.quantity = quantity;  // تحديث الكمية محليًا
      this._ToastrService.success('Item quantity updated successfully');
    },
    error: (err) => {
      console.log("Error updating quantity", err);
      this._ToastrService.error('Failed to update quantity');
    }
  });
}





}
