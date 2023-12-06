import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { LoginObject } from './LoginObject';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: any;
  loginflag = true;
  labels = UserDefinedLabels;
  private backButtonSubscription;
  constructor( private platform: Platform
    ,private navCtrl: NavController,
    private alertController: AlertController, private router: Router) { }

  // constructor() { }

  ionViewDidEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Do nothing (disable back button)
    });
  }

  ionViewWillLeave() {
    // Unsubscribe from the back button event when leaving the page
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
    this.credentials = new LoginObject();
  }

  async SignIN() {
    if (this.credentials.username == 'pk' && this.credentials.password == 'pk') {
      this.router.navigateByUrl('/foodmenuitemlist');
    }
    else{
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Wrong Credentials',
        buttons: ['OK']
      });
      await alert.present();
      console.log('Login Failed!'); 
    }
  }

}
