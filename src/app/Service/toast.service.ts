
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, duration: number = 2000, actionText?: string, actionHandler?: () => void) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'dark', // Change the color as needed
      buttons: actionText
        ? [
            {
              text: actionText,
              handler: actionHandler,
            },
          ]
        : [],
    });
    toast.present();
  }
}
