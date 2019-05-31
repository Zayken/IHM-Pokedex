import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }


  getFromUrl(url) {
    return this.http.get(url);
  }

  getAllPokemonFromApi() {
    return this.getFromUrl('https://pokeapi.co/api/v2/pokemon/?limit=802');
  }

  getPokemonById(id) {
    return this.getFromUrl('https://pokeapi.co/api/v2/pokemon/' + id);
  }

  getPokemonByName(name) {
    return this.getFromUrl('https://pokeapi.co/api/v2/pokemon/' + name);
  }

  getPokemonSpecies(pokemon) {
    return this.getFromUrl(pokemon.species.url);
  }

  getPokemonMove(move) {
    return this.getFromUrl(move.url);
  }

  getPokemonAbility(ability) {
    return this.getFromUrl(ability.url);
  }

  getPokemonChainEvol(species) {
    return this.getFromUrl(species.evolution_chain.url);
  }



}
