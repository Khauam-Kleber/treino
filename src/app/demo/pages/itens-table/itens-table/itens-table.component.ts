import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SteamItem } from 'src/app/models/steamItem.model';
import { PartidaService } from 'src/app/services/partida.service';
import { UsersService } from 'src/app/services/users.service';
import { PartidaFormComponent } from '../partida-form/partida-form.component';
//https://steamcommunity.com/sharedfiles/filedetails/?id=2164283242 drop ativo de caixa
@Component({
  selector: 'itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.scss']
})
export class ItensTableComponent implements OnInit {
  
  // displayedColumns: string[] = ['favoritar', 'name', 'media7dias', 'media30dias']; //usar quando buscar do banco?

  displayedColumns: string[] = ['timeContra', 'placar'];

  dataSource = new MatTableDataSource<any>();
  playerName: string = '';
  term: string = '';
  tipoItemFiltro: any = 1;
  // tiposItens = [{nome: 'Nada', value: 0}, {nome: 'Caixa', value: 1},  {nome: 'Capsula', value: 2}, {nome: 'Adesivo', value: 3},  {nome: 'Agentes', value: 4}]
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
    this.partidaService.buscarPartidasTime().subscribe((response:any) => this.dataSource = new MatTableDataSource(response.content) );
    this.dataSource.sort = this.sort;  

    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 1000);

  }

  cadastrarPartida(event): void {
    const dialogRef = this.dialog.open(PartidaFormComponent, {
      width: '250px',
      data: {item: event},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.itensService.buscarListaFavoritos(true);
    });
  }

}