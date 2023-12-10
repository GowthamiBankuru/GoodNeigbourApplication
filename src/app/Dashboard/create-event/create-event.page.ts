import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/service/common.service';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { PostService } from 'src/app/service/post.service';
import { PutService } from 'src/app/service/put.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  saveEventObject: any = {};
  labels = UserDefinedLabels;
  selectedDate: any;
  responseObject: any[] = [];

  level: any;
  eventObject: any;
  userObjectList: any[] = [];
  userAssign: any = {};
  eventObjectList: any[] = [];
  minDate: string;
  maxDate: string;

  constructor(private service$: PostService,
    private router: Router,
    private editService$: PutService,
    private getservice$: GetService,
    private alertController: AlertController,
    private deleteservice$: DeleteService,
    private common$: CommonService,
  ) {
    // Set your minimum and maximum date values
    // this.minDate = '2023-12-05'; // Replace with your desired minimum date
    // this.maxDate = '2024-02-01'; // Replace with your desired maximum date
    this.maxDate = formatDate(new Date(this.common$.getDefaultDate()), 'yyyy-MM-dd', 'en-US'); // Replace with your desired maximum date
    this.minDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state['data']) {
      this.eventObject = this.router.getCurrentNavigation().extras.state['data'];
      this.level = this.router.getCurrentNavigation().extras.state['level'];
      console.log(this.eventObject);

    }
  }

  ngOnInit(): void {
    // this.userAssign = new UserAssignedEvent();
    if (this.level === 'edit') {
      this.saveEventObject = this.eventObject;
      const defaultDate = this.saveEventObject.eventDate;
      const dateParts = defaultDate.split('-');
      this.selectedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      console.log('this.selectedDate', this.selectedDate);

      this.getAllUserFromEvent(this.saveEventObject.eventID);
    }
  }

  extractDatePart(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    const datePart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const formattedDate = datePart.toISOString().split('T')[0];

    return formattedDate;
  }


  async saveEvent() {
    if (this.selectedDate == undefined) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please Select Date !',
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
    this.saveEventObject.eventDate = this.extractDatePart(this.selectedDate);
    console.log(this.saveEventObject.eventDate);
    console.log("saveEventObject :: ", this.saveEventObject);
    this.service$.createEvent(this.saveEventObject).subscribe(async data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl("/searchEvent");

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
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Event :: ',
          buttons: [
            {
              text: 'OK',
              handler: () => {
              }
            }
          ]
        });
        await alert.present();
      });
  }

  async updateEvent() {
    if (this.selectedDate == undefined) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please Select Date !',
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
    this.saveEventObject.eventDate = this.extractDatePart(this.selectedDate);
    console.log("updateEventObject :: ", this.saveEventObject);
    this.editService$.editEvent(this.saveEventObject).subscribe(async data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                // location.reload();
                this.router.navigateByUrl("/searchEvent");
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
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Event :: ',
          buttons: [
            {
              text: 'OK',
              handler: () => {
              }
            }
          ]
        });
        await alert.present();
      });
  }

  getAllUserFromEvent(eventID: any) {
    console.log('eventID ::', eventID);

    this.getservice$.getAllUserFromEvent(eventID).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.userObjectList = data['result'][0];
        console.log('userObjectList-------->', this.userObjectList);

        this.getAllUserEventsByID(this.saveEventObject.eventID);

      } else {
        this.userObjectList = [];
      }
    },
      async error => {

        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Event :: ',
          buttons: [
            {
              text: 'OK',
              handler: () => {
              }
            }
          ]
        });
        await alert.present();
      });
  }


  getAllUserEventsByID(eventID: any) {
    console.log('eventID :: getAllUserEventsByID ::', typeof eventID);

    this.getservice$.getAllUserEventsByID(eventID).subscribe(data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.eventObjectList = data['result'][0];
        this.userObjectList = this.addAttendanceToUsers(this.userObjectList, this.eventObjectList);

      } else {
        this.eventObjectList = [];
      }
    },
      async error => {

        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Event :: ',
          buttons: [
            {
              text: 'OK',
              handler: () => {
              }
            }
          ]
        });
        await alert.present();
      });
  }

  removeUserEvent(element: any) {
    let eventID = this.eventObject.eventID;
    let userID = element.userID;
    this.deleteservice$.deleteUserFromEvent(userID, eventID).subscribe(async data => {
      if (data['statusCode'] === UserDefinedLabels.StatusCode_200) {
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.getAllUserFromEvent(this.saveEventObject.eventID);

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
                this.getAllUserFromEvent(this.saveEventObject.eventID);

              }
            }
          ]
        });
        await alert.present();
      }
    })
  }

  processUserEvent(element: any) {
    this.userAssign.eventID = this.eventObject.eventID;
    this.userAssign.userID = element.userID;
    this.service$.processUserFromEvent(this.userAssign).subscribe(async data => {
      if (data["statusCode"] === UserDefinedLabels.StatusCode_200) {
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                // location.reload();
                this.getAllUserFromEvent(this.saveEventObject.eventID);
              }
            }
          ]
        });
        await alert.present();
      }
    });
  }

  setAll(completed: boolean) {
    if (this.userAssign) {
      this.userAssign.attendend = completed;
    }
  }

  addAttendanceToUsers(users: any[], attendance: any[]): any[] {
    const updatedUsers = users.map((user) => {
      const matchingAttendance = attendance.find((a) => a.userID === user.userID);
      if (matchingAttendance) {
        user.attendend = matchingAttendance.attendend === null ? false : true;
      }
      return user;
    });

    return updatedUsers;
  }
}
