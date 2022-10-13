import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PartidaService } from 'src/app/services/partida.service';
import { UsersService } from 'src/app/services/users.service';
import { MatchFormComponent } from '../match-form/match-form.component';

@Component({
  selector: 'matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.scss']
})
export class MatchesTableComponent implements OnInit {

  displayedColumns: string[] = ['timeContra', 'placar', 'roundsToObserve', 'learnings'];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  dataSource = new MatTableDataSource<any>();

  playerName: string = '';
  term: string = '';
  tipoItemFiltro: any = 1;
  private sort = new MatSort();

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  constructor(private partidaService:PartidaService,  public dialog: MatDialog, public usuarioService: UsersService) {}

  ngOnInit() {
      this.fazBuscaItens();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fazBuscaItens();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }


  fazBuscaItens(){
    this.partidaService.findMatchesPagination(this.currentPage + 1, this.pageSize).subscribe((response:any) => { 
      this.dataSource = new MatTableDataSource(response.data) 
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = response.count;
    });
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
    });
  }


}