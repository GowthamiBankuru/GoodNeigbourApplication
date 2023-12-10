import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRewardPage } from './search-reward.page';

const routes: Routes = [
  {
    path: '',
    component: SearchRewardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRewardPageRoutingModule {}
