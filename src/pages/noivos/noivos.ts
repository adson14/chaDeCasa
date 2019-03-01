import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { noivos } from '../../domain/noivos/noivos';
import {Http} from '@angular/http';

@Component({
  selector: 'page-noivos',
  templateUrl: 'noivos.html'
})
export class NoivosPage {

  public noivos: noivos[];

  constructor( public navCtrl: NavController,
    private _http:Http,
    private _loadingCtrl:LoadingController,
    private _alertCtrl:AlertController) {
  }
  


  ngOnInit() {
   
    let loader = this._loadingCtrl.create({
      content: 'Listando componentes'

    });
    loader.present();
      this._http
      .get('http://adsonjesus.com/ap/noivos')
      .map(res => res.json())
      .toPromise()
      .then(noivos => {
        this.noivos = noivos;
        loader.dismiss();
      })

      .catch(err => {
        console.log(err);
        this._alertCtrl
        .create({
          title: 'Falha na conexão',
          buttons:[{text:'Estou ciente'}],
          subTitle: 'Não foi possível obter informações .Tente Novamente'
        }).present();
      });
    
  }



}
