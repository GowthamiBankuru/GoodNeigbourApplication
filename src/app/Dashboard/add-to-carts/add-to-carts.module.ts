import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToCartsPageRoutingModule } from './add-to-carts-routing.module';

import { AddToCartsPage } from './add-to-carts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToCartsPageRoutingModule
  ],
  declarations: [AddToCartsPage]
})
export class AddToCartsPageModule {}
