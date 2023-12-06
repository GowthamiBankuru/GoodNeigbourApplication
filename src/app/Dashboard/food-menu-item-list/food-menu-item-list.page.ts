import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-menu-item-list',
  templateUrl: './food-menu-item-list.page.html',
  styleUrls: ['./food-menu-item-list.page.scss'],
})
export class FoodMenuItemListPage implements OnInit {
  responseData:any[] = []
  constructor() { }

  ngOnInit() {
  }

}
