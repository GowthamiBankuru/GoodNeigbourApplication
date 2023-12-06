import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOfFoodItemPageRoutingModule } from './list-of-food-item-routing.module';

import { ListOfFoodItemPage } from './list-of-food-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfFoodItemPageRoutingModule
  ],
  declarations: [ListOfFoodItemPage]
})
export class ListOfFoodItemPageModule {}
