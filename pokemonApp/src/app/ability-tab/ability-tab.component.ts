import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTransferService } from '../data-transfer.service';
import { PokeApiService } from '../poke-api.service';


@Component({
  selector: 'app-ability-tab',
  templateUrl: './ability-tab.component.html',
  styleUrls: ['./ability-tab.component.css']
})
export class AbilityTabComponent implements OnInit {

  constructor(private dataTransfert: DataTransferService, private pokeApi: PokeApiService) {
    this.subscription = dataTransfert.pokemonDataObservable.subscribe(
      data => {
        this.ready = true;
        this.pokemonData = data;
        let count = 0;
        this.pokemonAbilities = [];
        this.pokemonData.abilities.forEach(element => {


          this.pokeApi.getPokemonAbility(element.ability).subscribe(
            (data2: any) => {
              count += 1;
              this.pokemonAbilities.push({
                name: data2.name.replace(/^\w/, c => c.toUpperCase()),
                slot: element.slot,
                secret: element.is_hidden,
                id : data2.id,
                description : data2.effect_entries[0].effect
              });

              if (count == this.pokemonData.abilities.length) {
                this.ready = true;
              }
            });
        });
      });

  }

  pokemonData;
  pokemonAbilities;
  stats;
  ready: Boolean = false;


  subscription: Subscription;


  ngOnInit() {
  }

}
