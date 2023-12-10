import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchEventPageRoutingModule } from './search-event-routing.module';

import { SearchEventPage } from './search-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchEventPageRoutingModule
  ],
  declarations: [SearchEventPage]
})
export class SearchEventPageModule {}
