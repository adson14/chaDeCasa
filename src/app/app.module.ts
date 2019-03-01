import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaPage } from '../pages/lista/lista';
import { DoarPage } from '../pages/doar/doar';
import { NoivosPage } from '../pages/noivos/noivos';
import { SobrePage } from '../pages/sobre/sobre';
import { CozinhaPage } from '../pages/cozinha/cozinha';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    
    ListaPage,
    DoarPage,
    NoivosPage,
    SobrePage,
    CozinhaPage,
    HomePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    HomePage,
    ListaPage,
    DoarPage,
    NoivosPage,
    SobrePage,
    CozinhaPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}