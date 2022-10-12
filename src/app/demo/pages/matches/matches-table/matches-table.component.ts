import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PartidaService } from 'src/app/services/partida.service';
import { MatchFormComponent } from '../match-form/match-form.component';
//https://steamcommunity.com/sharedfiles/filedetails/?id=2164283242 drop ativo de caixa
@Component({
  selector: 'matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.scss']
})
export class MatchesTableComponent implements OnInit {
  
  // displayedColumns: string[] = ['favoritar', 'name', 'media7dias', 'media30dias']; //usar quando buscar do banco?

  displayedColumns: string[] = ['timeContra', 'placar', 'roundsToObserve', 'learnings'];

  dataSource = new MatTableDataSource<any>();
  playerName: string = '';
  term: string = '';
  tipoItemFiltro: any = 1;
  // tiposItens = [{name: 'Nada', value: 0}, {name: 'Caixa', value: 1},  {name: 'Capsula', value: 2}, {name: 'Adesivo', value: 3},  {name: 'Agentes', value: 4}]
  private sort = new MatSort();
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  
  constructor(private partidaService:PartidaService, public itensService: PartidaService,  public dialog: MatDialog) {}
 

  ngOnInit() {
      this.fazBuscaItens();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    // this.itensService.buscarListaFavoritos();
    this.dataSource.sort = this.sort
  }


  fazBuscaItens(){
    // this.term
    this.partidaService.getAll().subscribe((response:any) => this.dataSource = new MatTableDataSource(response) );
    this.dataSource.sort = this.sort;  

    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 1000);

  }

  cadastrarPartida(item): void {
    const dialogRef = this.dialog.open(MatchFormComponent, {
      width: '1000px',
      data: {partida: item},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fazBuscaItens();
      //atualizar table
      // this.itensService.buscarListaFavoritos(true);
    });
  }


}