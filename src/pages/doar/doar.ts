import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { doar } from '../../domain/doar/doar';
import {Http} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-doar',
  templateUrl: 'doar.html'
})
export class DoarPage {
  

  public doar: doar[];
  constructor(public navCtrl: NavController,
    private _http:Http,
    private _loadingCtrl:LoadingController,
    private _alertCtrl:AlertController,
    public anitizer: DomSanitizer
  ) {

   
  }
  


  ngOnInit() {
    
     let loader = this._loadingCtrl.create({
       content: 'Listando componentes'
 
     });
     
     loader.present();
       this._http
       .get('http://adsonjesus.com/ap/doar')
       .map(res => res.json())
       .toPromise()
       .then(doar => {
         this.doar = doar;
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
