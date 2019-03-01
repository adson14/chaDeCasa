import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DoarPage } from '../pages/doar/doar';
import { NoivosPage } from '../pages/noivos/noivos';
import { SobrePage } from '../pages/sobre/sobre';


import { ListaPage } from '../pages/lista/lista';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = ListaPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToLista(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ListaPage);
  }goToDoar(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DoarPage);
  }goToNoivos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(NoivosPage);
  }goToSobre(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SobrePage);
  }
}
