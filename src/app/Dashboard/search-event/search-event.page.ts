import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.page.html',
  styleUrls: ['./search-event.page.scss'],
})
export class SearchEventPage implements OnInit {
  labels = UserDefinedLabels;
  levels: any | undefined;
  eventObject: any | undefined;

  responseData: any[] = [];
  constructor(private service$: GetService, private deleteService$: DeleteService, private navCtrl: NavController, private alertController: AlertController) { }


  ngOnInit(): void {
    this.getAllEvent();
  }

  getAllEvent() {
    this.service$.searchEvent(10, 1).subscribe(data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
        this.responseData = data['result'][0];
      }
      else {
        this.responseData = [];
      }
    });
  }


  editEvent(element: any) {
    this.levels = 'edit';
    this.eventObject = element;
    this.navCtrl.navigateForward('/event', {
      state: {
        data: this.eventObject,
        level: this.levels
      }
    });
  }

  deleteEvent(element: any) {
    this.deleteService$.deleteEventByID(element.eventID).subscribe(async data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        const alert = await this.alertController.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.getAllEvent();
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
