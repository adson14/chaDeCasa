import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { categoria } from '../../domain/categoria/categoria';//importa a classe do aobjeto
import {Http} from '@angular/http';//Necessário para conexão com API
import {CozinhaPage} from'../cozinha/cozinha';//instancia a página cozinha
import { Push, PushObject, PushOptions } from '@ionic-native/push';//Necessário para receber notificações
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  CozinhaPage = CozinhaPage;// instancia a pagina para poder enviar os dados

public categoria: categoria[];//instancia da classe categoria para receber o array

  constructor( public navCtrl: NavController,
    private _http:Http,
    private _loadingCtrl:LoadingController,
    private _alertCtrl:AlertController,
    private push: Push,
    platform:Platform,
    statusBar:StatusBar,
    splashScreen:SplashScreen
  ) {

    // Para a conexão com o firebase

      platform.ready().then(() =>{
        
        statusBar.styleDefault();
        splashScreen.hide();
        this.pushSetup();
      });


    }

// esta classe é a estrutura para receber as notificações no aplicativo
    pushSetup(){

      this.push.hasPermission()
      .then((res: any) => {
    
        if (res.isEnabled) {
          console.log('Acesso de notificação permitido ');
            
          const options: PushOptions = {
            android: {senderID:"904698297773"},//Nesta linha é passado o id do Firebase
            
           
         };

         const pushObject: PushObject = this.push.init(options);

         pushObject.on('notification').subscribe((notification: any) => {

          alert(notification.message);
         });
         
         pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
         
         pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


        } else {
          console.log('Acesso de notificação não permitido ');
        }
    
      });
    }

// Carregar os dados do Json ao abrir a tela
   ngOnInit() {
   
    let loader = this._loadingCtrl.create({
      content: 'Listando componentes'

    });
    loader.present();
      this._http
      .get('http://adsonjesus.com/ap/categorias')//recebe a lista de array
      .map(res => res.json())
      .toPromise()
      .then(categoria => {// categoria é o objedo Domain criado para receber os dados
        this.categoria = categoria;
        loader.dismiss();
      })

      //Se ocorrer algum erro temos o tratamento abaixo
      .catch(err => {
        console.log(err);
        this._alertCtrl
        .create({
          title: 'Falha na conexão',
          buttons:[{text:'Estou ciente'}],
          subTitle: 'Não foi possível abrir a lista .Tente Novamente'
        }).present();
      });
    
  }

  //metodo para pegar o objeto instanciado e mandar os dados para a classe CozinhaPage
  //os métodos são transferidos de uma página à outra
  seleciona(categoria){
    console.log('Entrou na Action seleciona');
    this.navCtrl.push(CozinhaPage, { restauranteSelecionado:categoria });
  }
  
}
