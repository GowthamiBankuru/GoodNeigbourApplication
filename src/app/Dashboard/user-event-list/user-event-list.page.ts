import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common.service';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-user-event-list',
  templateUrl: './user-event-list.page.html',
  styleUrls: ['./user-event-list.page.scss'],
})
export class UserEventListPage implements OnInit {

  MainResponseData: any[] = []
  responseData: any[] = []
  userObjectList: any[] = []
  responseDataUserEvent: any[] = []
  userObjectEvent: any[] = []
  noDataFoundFlag: boolean = false
  searchQuery: string = ''
  leavingAnimation = false;
  showMenu: boolean = false;
  selectedItem: any;
  labels = UserDefinedLabels
  constructor(
    private service$: GetService,
    private deleteService$: DeleteService,
    public commonService:CommonService,
    private alertController: AlertController,
  ) { }

  ngOnInit(): void {
    this.userObjectEvent = [];
    this.responseData = [];
    this.getUserByID()
  }

  getAllEvent() {
    this.responseData = [];
    this.MainResponseData = [];
    this.service$.searchEvent(10, 1).subscribe((data) => {
      if (data[UserDefinedLabels.result].length === 0) {
        this.noDataFoundFlag = true
      } else {
        this.noDataFoundFlag = false
      }

      if (data['statusCode'] === UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        this.responseData = data['result'][0];

        this.MainResponseData = data['result'][0];

        console.log('this.responseData',this.responseData);
        

        if (this.userObjectEvent && this.userObjectEvent.length > 0) {
          const eventIDSet = new Set(
            this.userObjectEvent.map((item) => item.eventID)
          )
          this.responseData.forEach((ele) => {
            ele.status = eventIDSet.has(ele.eventID) ? 11 : 13
          })
        }
      } else {
        this.responseData = []
      }
    })
  }

  getUserByID() {
    this.userObjectEvent = [];
    let userID: number = Number(sessionStorage.getItem('userID'))
    this.service$.getUserByID(userID).subscribe((data) => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        this.userObjectEvent = data['result'][0].joiningEventUser
        console.log('this.userObjectEvent :: ', this.userObjectEvent)
        this.getAllEvent()
      }
    })
  }

  assign(item: any) {
    item.attented = true
    let userID: number = Number(sessionStorage.getItem('userID'))
    this.service$
      .assignUserEvent(userID, Number(item.eventID))
      .subscribe(async (data) => {
        if (data['statusCode'] === UserDefinedLabels.StatusCode_200) {
          const alert = await this.alertController.create({
            cssClass: 'success-alert',
            header: 'Success',
            message: data['statusMessage'],
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.userObjectEvent = [];
                  this.responseData = [];
                  this.getUserByID();
                }
              }
            ]
          });
          await alert.present();
        }
      })
  }

  getAllUserFromEvent(eventID: any) {
    this.userObjectList = []
    console.log('eventID ::', eventID)
    this.service$.getAllUserFromEvent(eventID).subscribe(
      (data) => {
        if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
          this.userObjectList = data['result'][0]
          console.log('this.userObjectList', data['result'][0])
        }
      },
      async (error) => {

        const alert = await this.alertController.create({
          cssClass: 'custom-alert',
          header: 'Error',
          message: 'Error Adding Event :: ' + error,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.userObjectEvent = [];
                this.responseData = [];
                this.getUserByID();
              }
            }
          ]
        });
        await alert.present();
      }
    )
  }

  leave(item: any) {
    const userID = sessionStorage.getItem('userID')
    this.deleteService$
      .deleteUserFromEvent(Number(userID), item.eventID)
      .subscribe(
        async (data) => {
          if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
            const alert = await this.alertController.create({
              cssClass: 'custom-alert',
              header: 'Success',
              message: 'User Leave SuccessFully',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.userObjectEvent = [];
                    this.responseData = [];
                    this.getUserByID();
                  }
                }
              ]
            });
            await alert.present();
          } else {
            const alert = await this.alertController.create({
              header: 'Error',
              message: data['statusMessage'],
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                  }
                }
              ]
            });
            await alert.present();
          }
        },
        async (error) => {
          const alert = await this.alertController.create({
            cssClass: 'custom-alert',
            header: 'Error',
            message: 'Error leaving Event :: ' + error,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                }
              }
            ]
          });
          await alert.present();
        }
      )
  }

  searchEvents() {
    if (this.searchQuery) {
      this.responseData = this.responseData.filter((event) => {
        const query = this.searchQuery.toLowerCase()
        console.log(query)

        // Check if the search query is empty, and if it is, return true for all events
        if (query === '') {
          return true
        }

        return (
          event?.eventName?.toLowerCase().includes(query) ||
          event?.eventDate?.toLowerCase().includes(query) ||
          event?.eventVenue?.toLowerCase().includes(query) ||
          event?.eventID?.toString().includes(query)
        )
      })
    } else {
      this.responseData = this.MainResponseData // Clear search results when search query is empty
    }
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.searchQuery === '') {
      this.searchEvents();
    }
  }

  toggleMenu(item: any) {
    if (item) {
      item.showMenu = !item.showMenu;
      this.getAllUserFromEvent(item.eventID);
    } else {
      this.showMenu = true;
      this.selectedItem = item;
    }
  }

}
