import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserObject } from 'src/app/Authentication/signup/UserObject';
import { GetService } from 'src/app/service/get.service';
import { PostService } from 'src/app/service/post.service';
import { PutService } from 'src/app/service/put.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  saveUserObject: any;
  labels = UserDefinedLabels;
  selectedDate: any;
  responseObject: any[] = [];
  RoleList: any[] = ['Admin', 'Volunteer'];
  GenderList: any[] = ['Female', 'Male', 'Other'];
  statusList: any[] = ['Active', 'InActive'];
  level: any;
  userObject: any;
  EventUserList: any[] = [];
  userEventObjectList: any[] = [];
  minDate: Date | undefined;
  maxDate: string;
  currentRole: string | null | undefined;
  constructor(
    private service$: PostService, private editService$: PutService,
    private getService$: GetService, private router: Router,
    private alertController: AlertController,
  ) {
    this.maxDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
    console.log('maxDate------>',this.maxDate);
    
    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state['data']) {
      this.userObject = this.router.getCurrentNavigation().extras.state['data'];
      this.level = this.router.getCurrentNavigation().extras.state['level'];
      console.log(this.userObject);

    }
  }

  ngOnInit(): void {
    this.saveUserObject = new UserObject();
    this.currentRole = sessionStorage.getItem("currentUserRole");

    if (this.level === 'edit' || this.level === 'profile') {
      this.saveUserObject = this.userObject;
      const defaultDate = this.saveUserObject.dOB;
      const dateParts = defaultDate.split('-');
      this.selectedDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      this.EventUserList = this.saveUserObject.joiningEventUser;
      console.log(this.selectedDate);
      this.userEventObjectList = this.EventUserList;
    }
  }

  extractDatePart(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    const datePart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const formattedDate = datePart.toISOString().split('T')[0];
    return formattedDate;
  }

  async saveUser() {
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
    this.saveUserObject.dOB = this.extractDatePart(this.selectedDate);;
    this.saveUserObject.accountStatus = 'Active'
    console.log('this.saveUserObject :: ', this.saveUserObject);
    this.service$.createUser(this.saveUserObject).subscribe(async data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl("/searchUser");

              }
            }
          ]
        });
        await alert.present();
        console.log('User Add Succesfully!');
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
        console.log('User Adding Faild!');
      }
    },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding User :: ' + error,
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

  async updateuser() {
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
    this.saveUserObject.dOB = this.extractDatePart(this.selectedDate);;
    console.log('this.saveUserObject :: ', this.saveUserObject);

    this.editService$.editUser(this.saveUserObject).subscribe(async data => {
      if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                if (this.level == 'profile') {
                  this.getUserbyID();
                }
                if (this.level == 'edit') {
                  this.router.navigateByUrl("/searchUser");
                  console.log('User Add Succesfully!');
                }
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
        console.log('User Adding Faild!');
      }
    },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding User :: ' + error,
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

  getUserbyID() {
    const userID: number = Number(sessionStorage.getItem('userID'));
    this.getService$.getUserByID(userID).subscribe(data => {
      if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200) {
        const responseObject: any = data['result'][0];
        sessionStorage.setItem('userObject', JSON.stringify(responseObject));
        sessionStorage.setItem('userID', responseObject.userID);
        sessionStorage.setItem('currentUserRole', responseObject.roleName);
        if (this.currentRole == UserDefinedLabels.Volunteer) {
          this.router.navigateByUrl("/upComingEvent");
        } else {
          this.router.navigateByUrl("/leaderBoard");
        };
      }
    });
  }

}
