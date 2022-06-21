import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Item } from './../models/item';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  formCadastro: FormGroup;
  item: Item = new Item();
  listaItens: Item[] = [];
  item_key: string = '';
  edit_key: boolean = false

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router, private toastController: ToastController,) {
  }

  ngOnInit(){
    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      qtdeIdeal: ['', Validators.compose([Validators.required])],
      qtdeAtual: ['', Validators.compose([Validators.required])],
      qtdeCompra: [''],
      edit: [false]
  })
  }

  ionViewDidEnter(){
    this.listarItens();
  }

  clear(){
    this.formCadastro.value.nome = '';
    this.formCadastro.value.qtdeIdeal = '';
    this.formCadastro.value.qtdeAtual = '';
  }

  async salvarItem(){
      if(this.formCadastro.valid){
        let nomeProvisorio = this.formCadastro.value.nome;
        this.item.nome = nomeProvisorio[0].toUpperCase() + nomeProvisorio.substring(1);
        this.item.qtdeIdeal = this.formCadastro.value.qtdeIdeal;
        this.item.qtdeAtual = this.formCadastro.value.qtdeAtual;
        this.item.qtdeCompra = this.item.qtdeIdeal - this.item.qtdeAtual;
        await this.storageService.set(this.item.nome, this.item)
      this.edit_key = false;
       this.clear();
       this.ionViewDidEnter();
       this.ngOnInit();
       this.mostrarToast("Item salvo em sua Despensa");
     } else {
       this.mostrarToast("Campos não podem ser vazio");
     }
  }

  async editarItem(itemEdit: Item) {
    this.item_key = itemEdit.nome;
    this.edit_key = true;
    itemEdit.edit = true;
      this.formCadastro = this.formBuilder.group({
        nome: [itemEdit.nome],
        qtdeIdeal: [itemEdit.qtdeIdeal],
        qtdeAtual: [itemEdit.qtdeAtual],      
      })
  }

  async excluirItem(currNome){
    await this.storageService.remove(currNome)
    this.ionViewDidEnter();
    this.ngOnInit();
    this.mostrarToast("Item Exluido de sua Despensa");
  }

  async listarItens(){
      this.listaItens = await this.storageService.getAll();
  }

  GerarLista(){
    this.route.navigateByUrl('/tabs/tab2');
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
