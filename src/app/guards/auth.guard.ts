import { AlertController } from '@ionic/angular';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService, private alert: AlertController, private router: Router
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    const requiredRole = next.routeConfig?.data?.['roles'];

    if (requiredRole.some((role:any) => role === this.auth.getUserRole())) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
