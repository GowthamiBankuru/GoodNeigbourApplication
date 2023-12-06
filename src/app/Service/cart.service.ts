import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  listFoodItem: any[] = [
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/rycafujbdess1ekpiplx',
      foodName: 'Pizza',
      foodBrandCompany: 'Pizza Palace',
      foodCalories: 800,
      foodAddress: '123 Main St, Cityville',
      quantity: 1,
      price: 10.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/72c73e65ff60eeea758b7aa93093f08b',
      foodName: 'Burger',
      foodBrandCompany: 'Burger Barn',
      foodCalories: 600,
      foodAddress: '456 Oak St, Townsville',
      quantity: 2,
      price: 8.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/jnegtk93eons36ayepne',
      foodName: 'Sushi',
      foodBrandCompany: 'Sushi Heaven',
      foodCalories: 500,
      foodAddress: '789 Pine St, Villagetown',
      quantity: 3,
      price: 15.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/dvj2gjagbt8ljnvlmuxy',
      foodName: 'Salad',
      foodBrandCompany: 'Green Garden',
      foodCalories: 300,
      foodAddress: '101 Maple St, Greensville',
      quantity: 1,
      price: 7.49
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/be65eb7f3e41f238a0746bcb7964d098',
      foodName: 'Pasta',
      foodBrandCompany: 'Pasta Paradise',
      foodCalories: 700,
      foodAddress: '202 Birch St, Pastatown',
      quantity: 2,
      price: 12.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/98f62795d7eb69d324b12f9ce4044e02',
      foodName: 'Taco',
      foodBrandCompany: 'Taco Time',
      foodCalories: 450,
      foodAddress: '303 Cedar St, Tacoville',
      quantity: 4,
      price: 9.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ad9l3ould1aholieevgs',
      foodName: 'Ice Cream',
      foodBrandCompany: 'Sweet Scoops',
      foodCalories: 250,
      foodAddress: '404 Elm St, Dessert City',
      quantity: 1,
      price: 5.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/d60f2acf1beb3232f31c9429b15ee537',
      foodName: 'Steak',
      foodBrandCompany: 'Prime Cuts',
      foodCalories: 900,
      foodAddress: '505 Walnut St, Meatropolis',
      quantity: 1,
      price: 20.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ftvsh8hw7scrrbpfjjlh',
      foodName: 'Smoothie',
      foodBrandCompany: 'Fruit Fusion',
      foodCalories: 150,
      foodAddress: '606 Pineapple St, Smoothieville',
      quantity: 2,
      price: 6.99
    },
    {
      image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/b5678840720d9fc68a2024cc6f66dbd7',
      foodName: 'Chicken Wings',
      foodBrandCompany: 'Wing World',
      foodCalories: 750,
      foodAddress: '707 Oak St, Wingtown',
      quantity: 3,
      price: 14.99
    }
  ];
  cartItemList: any = [];
  private productList = new BehaviorSubject([]);

  constructor() { }

  getProducts(): any {
    return this.productList.asObservable();
  }

  setProduct(product: any): boolean {
    const isDuplicate = this.cartItemList.some(item => item.foodName === product.foodName);
  
    if (isDuplicate) {
      return false;
    }
  
    this.cartItemList.push({...product});
    this.productList.next(this.cartItemList);
  
    return true;
  }
  

  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    console.log('Add To Cart:- ', this.cartItemList);
  }

  getCartItemCount(): number {
    return this.cartItemList.length;
  }
  
}
