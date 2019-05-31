import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pokemon } from '../pokemon';
import { PokeApiService } from '../poke-api.service';
import { DataTransferService } from '../data-transfer.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { fadeInContent } from '@angular/material';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private pokeApi: PokeApiService, private dataTransfert: DataTransferService) { }

  searchBarId: String = '';
  searchFilter: String = '';
  toFilter: String = 'name';
  dataReady: Boolean = false;

  pokemonData;
  pokemonList = [];
  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;


  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  clickButtonGo() {


    this.pokeApi.getPokemonByName(this.myControl.value).subscribe((data) => {
      this.pokemonData = data;
      this.dataTransfert.setData(data);
    },
      (err) => {
        if (err.status == 404) {

          let element = document.getElementById('alert');
          let op = 1;  // initial opacity
          console.log('show alert');
          element.style.filter = 'alpha(opacity=100)';
          element.style.opacity = '1';
          element.style.display = 'block';
          setTimeout(function () {
            let timer = setInterval(function () {
              if (op <= 0.1) {
                element.style.display = 'none';
                clearInterval(timer);
              }
              element.style.opacity = op + '';
              element.style.filter = 'alpha(opacity=' + op * 100 + ")";
              op -= op * 0.1;
            }, 130);
          }, 3000);
        }
      }
    )
  };



  allPokemonFromApi;







  ngOnInit() {

    this.pokeApi.getAllPokemonFromApi().subscribe(data => {
      this.allPokemonFromApi = data;
      let i = 0;
      this.allPokemonFromApi.results.forEach(e => {
        i++;
        this.pokemonList.push(new Pokemon('' + i, e.name));
        if (i == this.allPokemonFromApi.results.length) {
          this.dataReady = true;
          this.options = this.pokemonList;
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        }
      })
    });
  }

}
