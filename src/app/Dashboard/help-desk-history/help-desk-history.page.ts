import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-help-desk-history',
  templateUrl: './help-desk-history.page.html',
  styleUrls: ['./help-desk-history.page.scss'],
})
export class HelpDeskHistoryPage implements OnInit {

  displayedColumns: string[] = ['userID', 'email', 'subject', 'message', 'action'];
  dataSource: any;
  labels = UserDefinedLabels;
  @ViewChild(IonModal) modal: IonModal;

  responseData: any[] = [];
  levels: any | undefined;
  contactObject: any | undefined;
  roleName: any | undefined;

  constructor(private service$: GetService,
    private navCtrl: NavController,
    private deleteService$: DeleteService,
    private alertService: AlertController) { }

  ngOnInit(): void {
    this.getAllContact();
    this.roleName = sessionStorage.getItem('currentUserRole');
  }

  getAllContact() {
    const roleName = sessionStorage.getItem('currentUserRole');
    if (roleName == 'Admin') {
      console.log('Admin');
      this.service$.searchContact(10, 1).subscribe(data => {
        if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
          this.responseData = data['result'][0];
        }
        else {
          this.responseData = [];
        }
      });
    } else if (roleName == 'Volunteer') {
      console.log('Volunteer');
      const userID: any = sessionStorage.getItem('userID');
      this.service$.searchContact(10, 1).subscribe(data => {
        if (data['statusCode'] == UserDefinedLabels.StatusCode_200 && data['result'] && data['result'].length > 0) {
          this.responseData = data['result'][0];
          this.responseData = this.responseData.filter(contact => contact.userID == userID);
          console.log('Volunteer',this.responseData);
        }
        else {
          this.responseData = [];
        }
      });
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editContact(element: any) {
    this.levels = 'edit';
    this.contactObject = element;
    this.navCtrl.navigateForward('/help-desk', {
      state: {
        data: this.contactObject,
        level: this.levels
      },
    });
  }

  deleteContact(element: any) {
    this.deleteService$.deleteContactByID(element.contactID).subscribe(async data => {
      if (data['statusCode'] == UserDefinedLabels.StatusCode_200) {
        const alert = await this.alertService.create({
          header: 'Success',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.getAllContact();
              }
            }
          ]
        });
        await alert.present();
      } else {
        const alert = await this.alertService.create({
          header: 'Error',
          message: data['statusMessage'],
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.getAllContact();
              }
            }
          ]
        });
        await alert.present();
      }
    });

  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    // this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  ionViewWillLeave() {
    // Clear or reset the data when leaving the page
    this.contactObject = {};
    this.levels = '';
  }
}
