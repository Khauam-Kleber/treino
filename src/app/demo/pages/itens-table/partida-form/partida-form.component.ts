import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { PartidaService } from "src/app/services/partida.service";
import { UsersService } from "src/app/services/users.service";
import { TimeService } from "src/app/services/time.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-partida-form',
  templateUrl: './partida-form.component.html',
  styleUrls: ['./partida-form.component.scss']
})
export class PartidaFormComponent implements OnInit {
  form;
  timesList = [];

  constructor(
    private formBuilder: FormBuilder,
    private partidaService: PartidaService,
    private timeService: TimeService,
    public dialogRef: MatDialogRef<PartidaFormComponent>,
    public usuarioService: UsersService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buscarTimesContras(this.usuarioService.userValue.data.time.id);

    this.criarForm();
    // this.itensService.buscarListaFavoritos();
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }



  criarForm() {
    this.form = this.formBuilder.group({
      id: [],
      times: [[]],
      placarTimeContra: [],
      placarTimePrincipal: [],
      resumoDosAprendizados: [],
      roundsObservar: []
    });

    // this.form.controls['quantity'].setValue( this.data.item.quantityPurchased)

  }
  get f() { return this.form.controls; }


  onNoClick(): void {
    this.dialogRef.close();
  }

  salvarPartida(){
    console.log(this.form.value);
  }

  criarNovoTime(time) {
    let novoTime = { id: null, name: time, timePai: { id: this.usuarioService.userValue.data.time.id } }
    this.timeService.create(novoTime)
      .subscribe(
        data => {
          this.timesList.push(data);
          this.timesList = [...this.timesList]
     
        },
        error => {
      
          // this.loading = false;
        });
  }

  removerTime(event) {
    console.log(event);

    this.timeService.remove(event.value.id)
      .subscribe(
        data => {
          this.toastr.success('Membro removido com Sucesso', 'Removido!', {
              positionClass: "toast-top-center",
          });
        },
        error => {
        
        });
  }

 

  
  buscarTimesContras(id) {
    this.timeService.buscarTimesContras()
      .subscribe(
        data => {
          // console.log(data)
          this.timesList = data;
        },
        error => {
          console.log(error)
          // this.loading = false;
        });
  }


}