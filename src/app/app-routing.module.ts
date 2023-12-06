import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Authentication/login/login.module').then(m => m.LoginPageModule)
  },
  // {
  //   path: 'error',
  //   component: ErrorPageComponent
  // },
  {
    path: 'signup',
    loadChildren: () => import('./Authentication/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./Authentication/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'foodmenuitemlist',
    loadChildren: () => import('./Dashboard/food-menu-item-list/food-menu-item-list.module').then( m => m.FoodMenuItemListPageModule)
  },
  {
    path: 'listoffooditem',
    loadChildren: () => import('./Dashboard/list-of-food-item/list-of-food-item.module').then( m => m.ListOfFoodItemPageModule)
  },
  {
    path: 'addtocarts',
    loadChildren: () => import('./Dashboard/add-to-carts/add-to-carts.module').then( m => m.AddToCartsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
