import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {
  labels = UserDefinedLabels;
  responseData: any[] = [];
  levels: any | undefined;
  userObject: any | undefined;

  constructor(private service$: GetService, private deleteService$: DeleteService, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.service$.searchUser(10, 1).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        this.responseData = data['result'][0];
      }
      else {
        this.responseData = [];
      }
    });
  }

  editUser(element: any) {
    this.levels = 'edit';
    this.userObject = element;

    this.navCtrl.navigateForward('/user', {
      state: {
        data: this.userObject,
        level: this.levels
      }
    });
  }

  deleteUser(element: any) {
    this.deleteService$.deleteUserByID(element.userID).subscribe(async data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {

        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.getAllUser();
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
