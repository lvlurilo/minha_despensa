import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '../models/item';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  listaItensCompra: Item[] = []
  codigoPais: string = '+55'  //Codigo do Brasil
  codigoCidade: string = ''  // DDD da cidade
  numeroWhatsApp: string = ''  //numero do whatsapp
  urlWhatsapp: string = ""

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {}

  ngOnInit(){
  }

  ionViewDidEnter(){
    this.listarItens();
  }

  async listarItens(){
    this.listaItensCompra = await this.storageService.getAll();
    return this.listaItensCompra
}

  async whatsApp(){
  let texto = await this.storageService.getAllProdutosQuantidades()
  this.urlWhatsapp = await "https://wa.me/"+this.codigoPais+this.codigoCidade+this.numeroWhatsApp+"?text="+texto
  window.open(this.urlWhatsapp).focus();
  }

}
