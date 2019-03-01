import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CozinhaPage } from './cozinha';

@NgModule({
  declarations: [
    CozinhaPage,
  ],
  imports: [
    IonicPageModule.forChild(CozinhaPage),
  ],
})
export class CozinhaPageModule {}
