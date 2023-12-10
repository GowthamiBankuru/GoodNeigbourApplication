import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  themeFlag = true;
  currentRoleFlag: boolean = true;
  menuFlag: boolean = false;
  currentUserRole: string | null | undefined;
  userObject: any = {};
  constructor(private router: Router, private authService$: AuthService) { }


  ngOnInit(): void {
    this.authService$.getDataUserObject().subscribe(data => {
      this.userObject = data != null ? data : JSON.parse(sessionStorage.getItem("userObject"));
      console.log('userObject', this.userObject);

    })

    this.authService$.data$.subscribe(data => {
      this.currentUserRole = data !== null ? data : sessionStorage.getItem("currentUserRole");
      this.menuFlag = true;
      console.log('this.currentUserRole', this.currentUserRole, this.menuFlag);
    });
    if (this.authService$.getUserRole()) {
      if (this.currentUserRole === 'Admin') {
        this.currentRoleFlag = true;
      }
      if (this.currentUserRole === 'Volunteer') {
        this.currentRoleFlag = true;
      }
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
