import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { ToastService } from 'src/app/Service/toast.service';

@Component({
  selector: 'app-list-of-food-item',
  templateUrl: './list-of-food-item.page.html',
  styleUrls: ['./list-of-food-item.page.scss'],
})
export class ListOfFoodItemPage implements OnInit {
  foodObjects: { image: string; foodName: string; foodBrandCompany: string; foodCalories: number; foodAddress: string; quantity: number; price: number; }[] = [];

  constructor(private toastService: ToastService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.foodObjects = this.cartService.listFoodItem
  }
  quantity: number = 1;

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }


  // In your component.ts file
addToCart(item) {
  if (!this.cartService.setProduct(item)) {
    this.toastService.presentToast(
      'Already Added To Cart.',
      3000,
      'Check The Cart',
      () => {
        this.router.navigateByUrl("/addtocarts");
      }
    );    
  }else{
    this.cartService.setProduct(item);
    this.toastService.presentToast(
      'Item added to cart.',
      3000,
      'Go To Cart',
      () => {
        // Your action handler logic goes here
        this.router.navigateByUrl("/addtocarts");
        console.log('Undo action clicked');
      }
    );
  }

}

}
