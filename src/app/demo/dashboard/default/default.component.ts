import { Component, OnInit } from '@angular/core';
import { PartidaService } from 'src/app/services/partida.service.js';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  listCardsShow = []

  constructor(public matchService: PartidaService,  private route: ActivatedRoute, public dialog: MatDialog) 
  {    
    this.matchService.findDashboardInfos().subscribe((response:any) => this.listCardsShow = response );
  }
  
  ngOnInit() { 
     
  }

  // removeItemCard(event){
  //   this.itensService.adicionarOuRemoverFavoritos(event);
  // }

  // dialogEditItem(event): void {
  //   const dialogRef = this.dialog.open(SkinDialogForm, {
  //     width: '250px',
  //     data: {item: event},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.itensService.buscarListaFavoritos(true);
  //   });
  // }


}
