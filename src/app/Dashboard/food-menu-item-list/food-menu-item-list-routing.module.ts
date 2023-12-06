import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodMenuItemListPage } from './food-menu-item-list.page';

const routes: Routes = [
  {
    path: '',
    component: FoodMenuItemListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodMenuItemListPageRoutingModule {}
