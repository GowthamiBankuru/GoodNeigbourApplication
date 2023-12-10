import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { PutService } from 'src/app/service/put.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';
import { RewardObject } from './RewardObject';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-create-reward',
  templateUrl: './create-reward.page.html',
  styleUrls: ['./create-reward.page.scss'],
})
export class CreateRewardPage implements OnInit {

  saveRewardObject: any;
  labels = UserDefinedLabels;
  selectedDate: any;
  responseObject: any[] = [];
  rewardAvailabilityList: any[] = ['Available', 'Limited Quantity', 'Out of Stock'];
  rewardTypeList: any[] = ['Discount', 'Gift ', 'Voucher', 'Electronics', 'Entertainment', 'Home & Kitchen'];
  minDate: Date | undefined;


  level: any;
  rewardObject: any;
  defaultDate: any;

  constructor(private service$: PostService, private editService$: PutService,
    private alertController: AlertController, private commonService: CommonService,
    private router: Router) {

    if (this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state['data']) {
      this.rewardObject = this.router.getCurrentNavigation().extras.state['data'];
      this.level = this.router.getCurrentNavigation().extras.state['level'];
      console.log(this.rewardObject);

    }
  }

  ngOnInit(): void {
    this.saveRewardObject = new RewardObject();
    const defaultDate = this.commonService.getDefaultDate();
    this.defaultDate = new Date(defaultDate);
    const month = (this.defaultDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    const day = this.defaultDate.getDate().toString().padStart(2, '0');
    const year = this.defaultDate.getFullYear();
    
    const formattedDate = `${month}/${day}/${year}`;
    this.selectedDate = formattedDate;
    console.log(`Default Date: ${defaultDate}`);
    if (this.level === 'edit') {
      this.saveRewardObject = this.rewardObject;
    }
  }


  async saveReward() {
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
    this.saveRewardObject.userID = sessionStorage.getItem('userID');
    this.saveRewardObject.expirationDate = this.extractDatePart(this.selectedDate);
    console.log('this.saveRewardObject :: ', this.saveRewardObject);

    this.service$.createReward(this.saveRewardObject).subscribe(async data => {
      if (data && data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl("/searchReward");
              }
            }
          ]
        });
        await alert.present();
        console.log('Reward Add Succesfully!');
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
        console.log('Reward Adding Faild!');
      }
    },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Reward :: ' + error,
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

  async updateReward() {
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
    this.saveRewardObject.userID = sessionStorage.getItem('userID');
    this.saveRewardObject.expirationDate = this.extractDatePart(this.selectedDate);
    console.log('this.saveRewardObject :: ', this.saveRewardObject);

    this.editService$.editReward(this.saveRewardObject).subscribe(async data => {
      if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200) {
        this.responseObject = data['result'];
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigateByUrl("/searchReward");
              }
            }
          ]
        });
        await alert.present();
        console.log('Reward Add Succesfully!');
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
        console.log('Reward Adding Faild!');
      }
    },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error Adding Reward :: ' + error,
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


  extractDatePart(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    const datePart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const formattedDate = datePart.toISOString().split('T')[0];
    return formattedDate;
  }
}
