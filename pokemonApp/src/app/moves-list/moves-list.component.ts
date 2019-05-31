import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import { DataTransferService } from '../data-transfer.service';
import { PokeApiService } from '../poke-api.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.css']
})
export class MovesListComponent implements OnInit {

  constructor(private dataTransfert: DataTransferService, private pokeApi: PokeApiService) { 
    this.subscription = dataTransfert.pokemonDataObservable.subscribe(
      data => {
        
        this.pokemonData = data; 
        this.pokemonMoves=[]; 
        let count=0;
        this.pokemonData.moves.forEach(e => {
          this.pokeApi.getPokemonMove(e.move).subscribe(
            (data2:any) => {
              count+=1;
              data2.path='assets/types_img/'+data2.type.name+'.png'
              data2.name=data2.name.replace(/^\w/, c => c.toUpperCase());
              this.pokemonMoves.push(data2);
              if(count==this.pokemonData.moves.length){
                this.allMoveReady=true;
                this.dataSource=new MatTableDataSource(this.pokemonMoves);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              }
            });
        });
      });

  }

  pokemonData;
  pokemonMoves;
  allMoveReady:Boolean=false;
  
  subscription: Subscription;
  
  displayedColumns: string[] = ['id', 'path', 'name', 'power'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    
  }

  ngOnDestroy() {
    // Unsubscribe an observable to prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
