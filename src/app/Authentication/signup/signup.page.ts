import { Component, OnInit } from '@angular/core';
import { UserObject } from './UserObject';
import { Router } from '@angular/router';
import { UserDefinedLabels } from 'src/assets/labelsContants';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loginObject: any;
  labels = UserDefinedLabels;
  responseObject: any;
  constructor(
    private router: Router, private alertController: AlertController) {
  }
  ngOnInit(): void {
    this.loginObject = new UserObject();
  }


  async SignUp() {
    const alert = await this.alertController.create({
      header: 'Sucessfully',
      message: 'Registation Done Sucessfully',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl("/login");
            this.loginObject = {};
          }
        }
      ]
    });
    await alert.present();
  }


  extractDatePart(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    const datePart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const formattedDate = datePart.toISOString().split('T')[0];
    return formattedDate;
  }
}
