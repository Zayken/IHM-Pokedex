import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }


 setData(data) {       
    this.pokemonDataTransfert.next(data);
  }  

  private pokemonDataTransfert = new Subject<string>();
  pokemonDataObservable = this.pokemonDataTransfert.asObservable();

  setDataSpecies(data) {      
    this.pokemonDataSpeciesTransfert.next(data);
  }  

  private pokemonDataSpeciesTransfert = new Subject<string>();
  pokemonDataSpeciesObservable = this.pokemonDataSpeciesTransfert.asObservable();
  


}
