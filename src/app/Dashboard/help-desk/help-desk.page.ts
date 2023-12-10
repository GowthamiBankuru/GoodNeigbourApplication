import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostService } from 'src/app/service/post.service';
import { PutService } from 'src/app/service/put.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';
import { ContactObject } from './ContactObject';
import { async } from '@angular/core/testing';
import { GetService } from 'src/app/service/get.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.page.html',
  styleUrls: ['./help-desk.page.scss'],
})
export class HelpDeskPage implements OnInit {
  @ViewChild("createContact") createContact;
  saveContactObject: any;
  labels = UserDefinedLabels;
  selectedDate: any;
  responseObject: any[] = [];
  ContactAvailabilityList: any[] = ['Available', 'Limited Quantity', 'Out of Stock'];
  ContactTypeList: any[] = ['Discount', 'Gift ', 'Voucher', 'Electronics', 'Entertainment', 'Home & Kitchen'];

  userResponseData: any = {};
  userName: string | undefined | null;
  level: any;
  contactObject: any;
  historyMessage: string | undefined;
  replyMessage: string | undefined;
  username: any;
  dataFromPreviousPage: any;
  receivedData: any;
  constructor(
    private route: ActivatedRoute,private getService$: GetService,
    private service$: PostService, private editService$: PutService,
    private router: Router, private alertController: AlertController
  ) {

    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state['data']) {
      this.contactObject = this.router.getCurrentNavigation().extras.state['data'];
      this.level = this.router.getCurrentNavigation().extras.state['level'];
      
    }

  }

  ngOnInit(): void {
    this.dataFromPreviousPage = this.route.snapshot;
    console.log(this.dataFromPreviousPage);
    this.saveContactObject = new ContactObject();
    if (this.level === 'edit') {
      console.log(this.saveContactObject,this.level);
      this.saveContactObject = this.contactObject;
      this.getUserByID(this.contactObject.userID);
      setTimeout(() => {
        this.historyMessage = this.makeRolesBold('Volunteer' + this.saveContactObject.message);
      }, 1000);
    }
  }

  saveContact() {
    this.saveContactObject.userID = sessionStorage.getItem('userID');
    // this.saveContactObject.message = this.replyMessage;
    console.log('this.saveContactObject :: ', this.saveContactObject);

    this.service$.createContact(this.saveContactObject).subscribe(async data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];

        const alert = await this.alertController.create({
          header: 'Success',
          message: 'E-Mail Sent Message SuccessFully',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.createContact.reset();
                this.router.navigateByUrl("/help-desk-history");
              }
            }
          ]
        });
        await alert.present();
        console.log('Contact Add Succesfully!');
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
        console.log('Contact Adding Faild!');
      }
    },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Contact :: ' + error,
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

  updateContact() {
    this.saveContactObject.userID = sessionStorage.getItem('userID');
    this.saveContactObject.message = this.replyMessage;
    console.log('this.saveContactObject :: ', this.saveContactObject);
    this.saveContactObject.role = sessionStorage.getItem('currentUserRole');
    this.editService$.editContact(this.saveContactObject).subscribe(async data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'E-Mail Reply SuccessFully',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl("/help-desk-history");
                this.contactObject = {};
              }
            }
          ]
        });
        await alert.present();
        console.log('Contact Add Succesfully!');
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
        console.log('Contact Adding Faild!');
      }
    },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Contact :: ' + error,
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


  makeRolesBold(text: string): string {
    const roles = ['Volunteer', 'Admin'];
      roles.forEach(role => {
        let regex = new RegExp(role, 'g');
        let roleName = role === 'Admin' ? role : role === 'Volunteer' ? this.userName : '';
        text = text.replace(regex, `<br><br><b class="bold-text">${roleName} : </b><br>`);
      });
    return text;
  }

  getUserByID(userID: any) {
    this.getService$.getUserByID(userID).subscribe(data => {
      this.userResponseData = data['result'][0];
      this.userName = this.userResponseData.username;
      console.log('this.userName---------->', this.userName);
    });
  }

}
