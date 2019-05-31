import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe.pipe';
import { PokeApiService } from './poke-api.service';
import { PokemonLookableComponent } from './pokemon-lookable/pokemon-lookable.component';
import { MovesListComponent } from './moves-list/moves-list.component';

import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { OrderModule } from 'ngx-order-pipe';
import { MatSortModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { StatsComponent } from './stats/stats.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AbilityTabComponent } from './ability-tab/ability-tab.component';
import { EvolutionComponent } from './evolution/evolution.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    FilterPokemonPipePipe,
    PokemonLookableComponent,
    MovesListComponent,
    StatsComponent,
    AbilityTabComponent,
    EvolutionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OrderModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    VirtualScrollerModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatGridListModule,
    MatAutocompleteModule
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
