import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Listener } from 'selenium-webdriver';
import { ItemDTO } from '../models/itemDTO';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  public lista: String = '';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    this._storage?.get(key);
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

  public getAll() {
    const lista = [];
    this._storage.forEach((value, key, index) => {
      lista.push(value)
    });
    return lista;
  }

  public removeAll(){
    this._storage?.clear();
  }

  
  public async getAllProdutosQuantidades(){

    // %20 space %0D pular linha
    let th = this;
    th.lista = '';
    await this._storage.forEach((value, key, index) => {
    let dto = {
      nome: value.nome,
      qtdeCompra: value.qtdeCompra,
    }

    th.lista += `%0D${String(dto.qtdeCompra)}%20-%20${dto.nome}%0D`;

    }); 

    return this.lista;  

  }
}
