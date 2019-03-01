import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { categoria } from '../../domain/categoria/categoria';
import {Http} from '@angular/http';
import {CozinhaPage} from'../cozinha/cozinha'


@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  CozinhaPage = CozinhaPage;

public categoria: categoria[];

  constructor( public navCtrl: NavController,
    private _http:Http,
    private _loadingCtrl:LoadingController,
    private _alertCtrl:AlertController) {}


   ngOnInit() {
   
    let loader = this._loadingCtrl.create({
      content: 'Listando componentes'

    });
    loader.present();
      this._http
      .get('http://adsonjesus.com/ap/categorias')
      .map(res => res.json())
      .toPromise()
      .then(categoria => {
        this.categoria = categoria;
        loader.dismiss();
      })

      .catch(err => {
        console.log(err);
        this._alertCtrl
        .create({
          title: 'Falha na conexão',
          buttons:[{text:'Estou ciente'}],
          subTitle: 'Não foi possível abrir a lista de restaurantes.Tente Novamente'
        }).present();
      });
    
  }

  seleciona(categoria){
    console.log('Entrou na Action seleciona');
    this.navCtrl.push(CozinhaPage, { restauranteSelecionado:categoria });
  }
  
}
