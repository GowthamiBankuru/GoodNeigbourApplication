/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-shadow */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { EMPTY, Observable, throwError, } from 'rxjs';
import { delay, retryWhen, tap, map, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private loadingCtrl: LoadingController,
    public toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('access_token'); // Modify this based on your token storage method.

    this.loadingCtrl.getTop().then(hasLoading => {
      if (!hasLoading) {
        this.loadingCtrl.create({
          message: '',
          duration: 1000,
          translucent: false,
          spinner: 'lines',
        }).then(loading => loading.present());
      }
    });

    if (token) {
      // Clone the request and add the Authorization header.
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 401:
                return this.handle401Error(req, next);
              default:
                return throwError(err);
            }
          }
          return throwError(err);
        }),
        retryWhen(err => {
          let retries = 1;
          return err.pipe(
            delay(1000),
            tap(() => {
              console.log('retry');
              this.presentToast(retries);
            }),
            map(err => {
              if (retries++ === 3) {
                throw err;
              } else {
                return err;
              }
            }),
            catchError(err => {
              console.log('error', err);
              this.router.navigateByUrl('error');
              return this.presentAlert(err.statusText);
            })
          );
        }),
        finalize(() => {
          this.loadingCtrl.getTop().then(hasLoading => {
            if (hasLoading) {
              this.loadingCtrl.dismiss();
            }
          });
        })
      );
    } else {
      return next.handle(req).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 401:
                return this.handle401Error(req, next);
              default:
                return throwError(err);
            }
          }
          return throwError(err);
        }),
        retryWhen(err => {
          let retries = 1;
          return err.pipe(
            delay(1000),
            tap(() => {
              console.log('retry');
              this.presentToast(retries);
            }),
            map(err => {
              if (retries++ === 3) {
                throw err;
              } else {
                return err;
              }
            }),
            catchError(err => {
              console.log('error', err);
              this.router.navigateByUrl('error');
              return this.presentAlert(err.statusText);
            })
          );
        }),
        finalize(() => {
          this.loadingCtrl.getTop().then(hasLoading => {
            if (hasLoading) {
              this.loadingCtrl.dismiss();
            }
          });
        })
      );
    }
  }

  async presentToast(retries) {
    const toast = await this.toastController.create({
      message: `Retry: ${retries}/3`,
      duration: 1000
    });
    toast.present();
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Oops Connections Failed!',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    console.log('should refresh token');
    return EMPTY;
  }

}
