import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfFoodItemPage } from './list-of-food-item.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfFoodItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfFoodItemPageRoutingModule {}
