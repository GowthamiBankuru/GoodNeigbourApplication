import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodMenuItemListPageRoutingModule } from './food-menu-item-list-routing.module';

import { FoodMenuItemListPage } from './food-menu-item-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodMenuItemListPageRoutingModule
  ],
  declarations: [FoodMenuItemListPage]
})
export class FoodMenuItemListPageModule {}
