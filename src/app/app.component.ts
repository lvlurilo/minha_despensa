import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Item } from './models/item';
import { IonicModule, IonicSafeString, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  item: Item = new Item();
  listaItens: Item[] = [];

  constructor(private storageService: StorageService, private route: Router, private toastController: ToastController, platform: Platform) {

  }

  ngOnInit(){
  }

  ionViewDidEnter(){
  }

  async LimparLista(){ 
    await this.storageService.removeAll();
    this.mostrarToast("Itens excluidos da sua Despensa")
    await this.route.navigate(['tabs/tab2']);
    this.route.navigate(['tabs/tab1']);
  }

  Sair(){ 
    console.log("Sair")
  }

  async listarItens(){
    this.listaItens = await this.storageService.getAll();
  }

  mostrarToast(msg: string) {
    this.toastController.create({
      message: msg,
      duration: 1200,
      position: 'top',
      cssClass: 'card-toast'
    }).then((obj) => {
      obj.present();
    });
  }
}
