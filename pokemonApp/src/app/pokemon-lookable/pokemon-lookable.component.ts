import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { Subscription } from 'rxjs';
import { PokeApiService } from '../poke-api.service';

@Component({
  selector: 'app-pokemon-lookable',
  templateUrl: './pokemon-lookable.component.html',
  styleUrls: ['./pokemon-lookable.component.css']
})
export class PokemonLookableComponent implements OnInit {

  constructor(private dataTransfert: DataTransferService, private pokeApi: PokeApiService) {
    this.subscription = dataTransfert.pokemonDataObservable.subscribe(
      data => {
        this.pokemonData = data;
        this.pokeApi.getPokemonSpecies(this.pokemonData).subscribe(
          data2 => {
            this.dataTransfert.setDataSpecies(data2); 
            this.pokemonSpecies = data2;
            this.types=[];
            this.pokemonData.types.forEach(element => {
              element.path='assets/types_img/'+element.type.name+'.png'
              this.types.push(element);
            });
            this.name = this.pokemonData.name.replace(/^\w/, c => c.toUpperCase());
            this.id = this.pokemonData.id;
            this.pokemonImg = this.pokemonData.sprites.front_default;
            this.description = this.pokemonSpecies.flavor_text_entries.find(e => e.language.name == 'en').flavor_text;
            this.shiney=false;
          });
      });
  }

  pokemonData;
  pokemonSpecies;

  pokemonImg: String;
  name: String;
  id: String;
  description: String;
  types:String[];

  shiney: Boolean=false;
  backImg: Boolean=false;

  rotateButtonPath:String='assets/rotate.png';

  subscription: Subscription;
  ngOnInit() {
  }

  ngOnDestroy() {
    // Unsubscribe an observable to prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  loadShiney(){
    this.shiney=true;
    this.pokemonImg = this.pokemonData.sprites.front_shiny;
    
  }

  unloadShiney(){
    this.shiney=false;
    this.pokemonImg = this.pokemonData.sprites.front_default;
  }

  rotate(){
    switch(this.shiney){
      case true :
      if(this.backImg){
        this.pokemonImg=this.pokemonData.sprites.front_shiny;
        this.backImg=false;
      }
      else{
        this.pokemonImg=this.pokemonData.sprites.back_shiny;
        this.backImg=true;
      }
      break;

      case false :
      if(this.backImg){
        this.pokemonImg=this.pokemonData.sprites.front_default;
        this.backImg=false;
      }
      else{
        this.pokemonImg=this.pokemonData.sprites.back_default;
        this.backImg=true;
      }
      break;
    }
  }

  over(){this.rotateButtonPath='assets/rotateWhite.png';}
  out(){this.rotateButtonPath='assets/rotate.png';}

}
