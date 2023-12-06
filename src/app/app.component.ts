import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './Service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit ,DoCheck{
  themeFlag = true;
  cartItemCount:any = 0;
  currentRoleFlag: boolean = true;
  menuFlag: boolean = false;
  currentUserRole: string | null | undefined;
  userObject: any | null | undefined;
  constructor(private router: Router,private cartService: CartService) { }
  ngDoCheck(): void {
    this.cartService.getProducts().subscribe((data: any) => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }


  

  ngOnInit(): void {    
    this.userObject = JSON.parse(sessionStorage.getItem("userObject"));
    console.log('this.userObject', this.userObject);
    try {


      // Check if userObject is not null before accessing its properties
      if (this.userObject !== null && typeof this.userObject === 'object') {
        // Assuming 'username' is a property of the userObject
        const username = this.userObject.username;
        // Use 'username' as needed
      } else {
        // Handle the case where userObject is null or not an object
        // console.error("Invalid userObject:", this.userObject);
        // You might want to provide a default value or take other appropriate actions
        this.userObject = {}; // or any default value
      }
    } catch (error) {
      // Handle the error here
      console.error("Error parsing userObject:", error);

      // You might want to provide a default value or take other appropriate actions
      this.userObject = {}; // or any default value
    }

  }
  toggleTheme(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      this.themeFlag = !this.themeFlag;
    }
    else {
      this.themeFlag = !this.themeFlag;
      document.body.setAttribute('color-theme', 'light');
    }
  }

  logout() {
    this.currentRoleFlag = false;
    this.menuFlag = false;
    sessionStorage.clear();
    this.router.navigateByUrl('/login')
  }
  private startY = 0;
  private moveThreshold = 20; // Adjust this value as needed
  public hideToolbar = false;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const currentY = event.touches[0].clientY;

    if (Math.abs(currentY - this.startY) > this.moveThreshold) {
      if (currentY > this.startY) {
        // Swiping down
        this.hideToolbar = false;
      } else {
        // Swiping up
        this.hideToolbar = true;
      }

      this.startY = currentY;
    }
  }
}
