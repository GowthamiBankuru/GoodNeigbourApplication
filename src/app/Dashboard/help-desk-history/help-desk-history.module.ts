import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpDeskHistoryPageRoutingModule } from './help-desk-history-routing.module';

import { HelpDeskHistoryPage } from './help-desk-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpDeskHistoryPageRoutingModule
  ],
  declarations: [HelpDeskHistoryPage]
})
export class HelpDeskHistoryPageModule {}
