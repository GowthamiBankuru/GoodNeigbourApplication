import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToCartsPage } from './add-to-carts.page';

const routes: Routes = [
  {
    path: '',
    component: AddToCartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToCartsPageRoutingModule {}
