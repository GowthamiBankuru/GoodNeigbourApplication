import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpRequestInterceptor } from './Interceptor/http-interceptor.interceptor';
import { ErrorPageComponent } from './components/error-page/error-page.component';
@NgModule({
  declarations: [AppComponent,ErrorPageComponent],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
    ],
  providers:
  [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi:true
    }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
