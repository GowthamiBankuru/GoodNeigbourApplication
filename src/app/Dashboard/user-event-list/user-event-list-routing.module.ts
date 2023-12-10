import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEventListPage } from './user-event-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserEventListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserEventListPageRoutingModule {}
