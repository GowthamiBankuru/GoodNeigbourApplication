import { Component, OnInit } from '@angular/core';
import { UserObject } from './UserObject';
import { EMPTY, exhaustMap } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { Router } from '@angular/router';
import { UserDefinedLabels } from 'src/assets/labelsContants';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loginObject: any;
  labels = UserDefinedLabels;
  RoleList: any[] = ['Volunteer'];
  GenderList: any[] = ['Female', 'Male', 'Other'];
  responseObject: any;
  selectedDate: string | undefined | null;
  maxDate: string | undefined;
  constructor(private service$: PostService,
    private router: Router, private alertController: AlertController) {
      this.maxDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }
  ngOnInit(): void {
    this.loginObject = new UserObject();
  }


  SignUp() {
    if (this.loginObject.userPassword !== this.loginObject.Re_userPassword) {
      // this.alertService.showAlert("Success", 'Password Not Match. Please Correct Password', () => { });
    }
    this.loginObject.dOB = this.extractDatePart(this.selectedDate);
    this.loginObject.accountStatus = 'Active';
    this.loginObject.gender = 'Male';
    console.log('this.loginObject', this.loginObject);

    this.service$
    .createUser(this.loginObject)
    .pipe(
      exhaustMap(async data => {
        if (data && data['statusCode'] == '200') {
          this.responseObject = data['result'];
          const alert = await this.alertController.create({
            header: 'Success',
            message: data['statusMessage'],
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.router.navigateByUrl("/");
                }
              }
            ]
          });
          await alert.present();
          console.log('Sign Up done Successfully!');
        } else {
          console.log('Sign Up Failed!');
        }
        return EMPTY; // Return an empty observable to signify completion
      })
    )
    .subscribe(
      () => {
        // This block will be executed when the inner observable is completed
      },
     async error => {
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Sign up error!',
          buttons: [
            {
              text: 'OK',
              handler: () => {
              }
            }
          ]
        });
        await alert.present();
        // this.alertService.showAlert("Error", 'Sign up error!', () => {
        // });
      }
    );
  }


  extractDatePart(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    const datePart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const formattedDate = datePart.toISOString().split('T')[0];
    return formattedDate;
  }
}
