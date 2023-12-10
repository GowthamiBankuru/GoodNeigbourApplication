import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpDeskHistoryPage } from './help-desk-history.page';

const routes: Routes = [
  {
    path: '',
    component: HelpDeskHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpDeskHistoryPageRoutingModule {}
