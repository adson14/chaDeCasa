import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController,AlertController,NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { categoria } from '../../domain/categoria/categoria';///como o restuarnte
import { restaurante } from '../../domain/restaurante/restaurante';///como o cardapio

/**
 * Generated class for the CozinhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cozinha',
  templateUrl: 'cozinha.html',
})
export class CozinhaPage {

  public categoria : categoria;
  public url: string;
    public restaurante: restaurante[];

  constructor(public navCtrl: NavController,
    private _http:Http,
    private _loadingCtrl:LoadingController,
    private _alertCtrl:AlertController,
    public navParams:NavParams) 
    {

      //Recebendo os dados do objeto categoria que foi passado pela pagina
      //de cardápio
      this.categoria = this.navParams.get('restauranteSelecionado');
      console.log(this.categoria.nome);
      //Recebem o JSON passando como parametro o codigo da categoria
      this.url = "http://adsonjesus.com/ap/iten/"+this.categoria.codigo;
  }

  ngOnInit(){


    let loader = this._loadingCtrl.create({
      content: 'Buscando cardápio. Aguarde...'
  });
  loader.present();
  this._http
      .get(this.url)
      .map( res => res.json())
      .toPromise()
      .then( restaurante => {
          this.restaurante = restaurante;
          loader.dismiss();
      })
      .catch(err =>{
          console.log(err);
          loader.dismiss();
          this._alertCtrl
              .create({
                  title: 'Falha na conexão',
                  buttons: [{ text: 'OK estou ciente!'}],
                  subTitle: "Não foi possível obter o cardapio. Tente mais tarde."
              }).present();
      });

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CozinhaPage');
  }
  

}
