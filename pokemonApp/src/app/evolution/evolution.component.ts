import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTransferService } from '../data-transfer.service';
import { PokeApiService } from '../poke-api.service';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {

  constructor(private dataTransfert: DataTransferService, private pokeApi: PokeApiService) {
    this.dataReady = false;
    this.subscription1 = dataTransfert.pokemonDataObservable.subscribe(
      data => {
        this.pokemonData = data;
        this.data1Ready = true;
        if (this.data1Ready && this.data2Ready) {
          this.onBothDataReady();
        }
      });
    this.subscription2 = dataTransfert.pokemonDataSpeciesObservable.subscribe(
      data => {
        this.pokemonSpecies = data;
        this.data2Ready = true;
        if (this.data1Ready && this.data2Ready) {
          this.onBothDataReady();
        }
      });
  }

  data1Ready: Boolean = false;
  data2Ready: Boolean = false;
  pokemonData;
  pokemonSpecies;
  chainEvol;
  family;
  asEvolution;
  dataReady: Boolean = false
  subscription1: Subscription;
  subscription2: Subscription;

  onBothDataReady() {
    this.pokeApi.getPokemonChainEvol(this.pokemonSpecies).subscribe(data => {
      this.data1Ready = false;
      this.data2Ready = false;
      this.chainEvol = data;
      this.pokeApi.getPokemonByName(this.chainEvol.chain.species.name).subscribe((data2: any) => {
        this.family = [{
          name: this.chainEvol.chain.species.name.replace(/^\w/, c => c.toUpperCase()),
          url: this.chainEvol.chain.species.url,
          id: data2.id,
          img: data2.sprites.front_default
        }];
        let evolves_to = this.chainEvol.chain.evolves_to;
        let count = 0;
        while (evolves_to.length != 0) {
          evolves_to.forEach(element => {

            this.pokeApi.getPokemonByName(element.species.name).subscribe((data3: any) => {
              count += 1;
              this.family.push({
                name: element.species.name.replace(/^\w/, c => c.toUpperCase()),
                url: element.species.url,
                id: data3.id,
                img: data3.sprites.front_default
              });
              this.dataReady = true;
            });
            evolves_to = element.evolves_to;
          });
        }
      });


    });
  }

  breakpoint;



  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 1450) ? 1 : 3;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1450) ? 1 : 3;
  }

  over(id) {
    let elem = document.getElementById(id);
    elem.style.backgroundColor = 'lightgray';
    elem.style.borderRadius = "20px";
    elem.style.cursor='pointer';
  }

  out(id) {
    let elem = document.getElementById(id);
    elem.style.backgroundColor = '';
    elem.style.borderRadius = "";
    elem.style.cursor='';
  }

  click(id) {
    this.pokeApi.getPokemonById(id).subscribe(data => {
      this.pokemonData = data;
      this.dataTransfert.setData(data);
    })
  }

}
