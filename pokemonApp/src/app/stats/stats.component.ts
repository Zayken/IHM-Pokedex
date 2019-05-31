import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
import { PokeApiService } from '../poke-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private dataTransfert: DataTransferService, private pokeApi: PokeApiService) { 
    this.subscription = dataTransfert.pokemonDataObservable.subscribe(
      data => {
        this.ready=true;
        this.pokemonData = data; 
        this.stats=this.pokemonData.stats.reverse();
        this.stats.forEach(element => {
          element.value=element.base_stat*100/255.0;
          element.color={
            one:false,
            two:false,
            three:false,
            four:false,
            five:false,
            six:false,
            seven:false,
            eight:false,
            nine:false
          };
          this.assignColor(element);
          element.stat.name=element.stat.name.replace(/^\w/, c => c.toUpperCase());
        });
      });

  }

  pokemonData;
  stats;
  ready:Boolean=false;

  
  subscription: Subscription;
  ngOnInit() {
  }

  assignColor(element:any){
    let value=element.value;
    if(value>=0&&value<12.5){
      element.color.one=true;
    }
    else if(value>=12.5&&value<25){
      element.color.two=true;
    }
    else if(value>=25&&value<37.5){
      element.color.three=true;
    }
    else if(value>=37.5&&value<50){
      element.color.four= true;
    }
    else if(value>=50&&value<62.5){
      element.color.five=true;
    }
    else if(value>=62.5&&value<75){
      element.color.six=true;
    }
    else if(value>=75&&value<87.5){
      element.color.seven=true;
    }
    else if(value>=87.5&&value<100){
      element.color.eight=true;
    }
    else if(value=100){
      element.color.nine=true;
    }
  }
}
