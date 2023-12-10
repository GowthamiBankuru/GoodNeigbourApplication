import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserEventListPageRoutingModule } from './user-event-list-routing.module';

import { UserEventListPage } from './user-event-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserEventListPageRoutingModule
  ],
  declarations: [UserEventListPage]
})
export class UserEventListPageModule {}
