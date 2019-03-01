import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { sobre } from '../../domain/sobre/sobre';
import {Http} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';// necessário para receber URL externa

@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html'
})
export class SobrePage {
  

  public sobre: sobre[];
  constructor(public navCtrl: NavController,
    private _http:Http,
    private _loadingCtrl:LoadingController,
    private _alertCtrl:AlertController,
    public anitizer: DomSanitizer ) {
     
     
  }
  


  ngOnInit() {
   
    let loader = this._loadingCtrl.create({
      content: 'Listando componentes'

    });
    loader.present();
      this._http
      .get('http://adsonjesus.com/ap/endereco')
      .map(res => res.json())
      .toPromise()
      .then(sobre => {
        this.sobre = sobre;
        loader.dismiss();
      })

      .catch(err => {
        console.log(err);
        this._alertCtrl
        .create({
          title: 'Falha na conexão',
          buttons:[{text:'Estou ciente'}],
          subTitle: 'Não foi possível abrir.Tente Novamente'
        }).present();
      });
    

      
  }




 
}
