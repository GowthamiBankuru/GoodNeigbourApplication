import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';
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
    private alertController: AlertController, private router: Router, private service$: PostService, private authService: AuthService) { }

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

  SignIN() {
    this.service$.LoginUser(this.credentials).subscribe(
      (data: any) => {
        if (data && data[this.labels.result] && data[this.labels.result].length > 0) {
          this.handleSuccessfulLogin(data[this.labels.result][0]);
        } else {
          this.handleLoginFailure("Login Failed");
        }
      },
      (error: any) => {
        this.handleLoginFailure("Login Failed");
      }
    );
  }

  handleSuccessfulLogin(responseObject: any) {
    sessionStorage.setItem('userObject', JSON.stringify(responseObject));
    sessionStorage.setItem('userID', responseObject.userID);
    sessionStorage.setItem('currentUserRole', responseObject.roleName);
    sessionStorage.setItem('access_token', responseObject.token);
    this.authService.setData(responseObject.roleName);
    this.authService.setDataUserObject(responseObject);

    if (responseObject.roleName == 'Admin') {
      this.navCtrl.navigateRoot('/leaderBoard');
    } else if (responseObject.roleName == 'Volunteer') {
      this.navCtrl.navigateRoot('/upComingEvent');
    }

    console.log('Login done Successfully!');
  }

  async handleLoginFailure(errorMessage: string) {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Wrong Credentials',
      buttons: ['OK']
    });
    await alert.present();
    console.log('Login Failed!');
  }

  async showAlert(message1) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: message1,
      message: '',
      buttons: ['OK']
    });
    await alert.present();
  }

}
