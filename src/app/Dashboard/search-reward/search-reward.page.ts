import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-search-reward',
  templateUrl: './search-reward.page.html',
  styleUrls: ['./search-reward.page.scss'],
})
export class SearchRewardPage implements OnInit {

  labels = UserDefinedLabels;
  responseData: any[] = [];
  levels: any | undefined;
  rewardObject: any | undefined;

  constructor(private service$: GetService, private deleteService$: DeleteService, private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit(): void {
    this.getAllReward();
  }

  getAllReward() {
    this.service$.searchReward(10, 1).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        this.responseData = data['result'][0];
      }
      else {
        this.responseData = [];
      }
    });
  }

  editReward(element: any) {
    this.levels = 'edit';
    this.rewardObject = element;

    this.navCtrl.navigateForward('/reward', {
      state: {
        data: this.rewardObject,
        level: this.levels
      }
    });
  }

  deleteReward(element: any) {
    this.deleteService$.deleteRewardByID(element.rewardID).subscribe(async data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.getAllReward();
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
    });
  }

}
