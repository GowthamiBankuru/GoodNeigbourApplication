import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';
import { ToastService } from 'src/app/Service/toast.service';

@Component({
  selector: 'app-add-to-carts',
  templateUrl: './add-to-carts.page.html',
  styleUrls: ['./add-to-carts.page.scss'],
})
export class AddToCartsPage implements OnInit {


  constructor(private toastService: ToastService, private cartService: CartService) { }
  cartItems: any[] = [];

  ngOnInit() {
    this.cartService.getProducts().subscribe(data => {
      this.cartItems = data;
    });

  }


  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

}
