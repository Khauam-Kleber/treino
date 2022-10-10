import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { PartidaService } from "src/app/services/partida.service";
import { UsersService } from "src/app/services/users.service";
import { TimeService } from "src/app/services/time.service";
import { ToastrService } from "ngx-toastr";
import { PerformanceService } from "src/app/services/performance.service";

@Component({
  selector: 'app-partida-form',
  templateUrl: './partida-form.component.html',
  styleUrls: ['./partida-form.component.scss']
})
export class PartidaFormComponent implements OnInit {
  form;
  timesList = [];
  submitted = false;
  isLinear = true;
  usuariosList = [];
  performances = new FormArray([]);


  constructor(
    private formBuilder: FormBuilder,
    private partidaService: PartidaService,
    private timeService: TimeService,
    public dialogRef: MatDialogRef<PartidaFormComponent>,
    public usuarioService: UsersService,
    private toastr: ToastrService,
    public performanceService: PerformanceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buscarTimesContras(this.usuarioService.userValue.data.teamId);

    this.criarForm(this.data.partida);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  criarForm(partida?) {
    this.form = this.formBuilder.group({
      _id: [partida ? partida._id : null, Validators.required],
      teamAgainst: [partida.teamAgainst ? partida.teamAgainst._id : null, Validators.required],
      scoreboardTeamAgainst: [partida ? partida.scoreboardTeamAgainst : null, Validators.required],
      scoreboardTeamHome: [partida ? partida.scoreboardTeamHome : null, Validators.required],
      learnings: [partida ? partida.learnings : null, Validators.required],
      roundsToObserve: [partida ? partida.roundsToObserve : null, Validators.required]
    });
  }
  get f() { return this.form.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvarPartida() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log("invalido")
      return;
    }

    // this.loading = true;
    if (this.form.get("_id").value) {
      //editar
      this.partidaService.update(this.form.get("_id").value, this.form.value)
        .subscribe(
          data => {
            this.toastr.success('Dados salvos', 'Editado com Sucesso!', {
              positionClass: "toast-top-center",
            });
          },
          error => {
            console.log(error)
            // this.loading = false;
          });
    } else {
      this.partidaService.create(this.form.value)
        .subscribe(
          data => {
            this.form.get("_id").setValue(data._id);

            this.toastr.success('Dados salvos', 'Cadastrado com Sucesso!', {
              positionClass: "toast-top-center",
            });
          },
          error => {
            console.log(error)
            // this.loading = false;
          });
    }
  }

  criarNovoTime(time) {
    let novoTime = { _id: null, name: time, teamOwner: { _id: this.usuarioService.userValue.data.teamId } }
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
    this.timeService.remove(event.value._id)
      .subscribe(
        data => {
          this.toastr.success('Membro removido com Sucesso', 'Removido!', {
            positionClass: "toast-top-center",
          });
        },
        error => {

        });
  }

  buscarTimesContras(_id) {
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

  abaPerformace(event){
    this.performanceService.getAllByMatchId(this.form.get("_id").value)
    .subscribe(
      data => {
        data.forEach(performanceInstance => {
          this.performances.push(this.criarFormPerformaces(performanceInstance))
        });

     
      },
      error => {
        console.log(error)
        // this.loading = false;
      });

    if(event.selectedIndex === 1){
      this.buscarMembrosTime(this.usuarioService.userValue.data.teamId);
     
    }
  }

  addPerformaceForm(){
    this.performances.push(this.criarFormPerformaces())
  }

  //talvez fazer o módulo de performance separado em outro componente para não gargalhar este!
  criarFormPerformaces(performanceInstance?) {
    return this.formBuilder.group({
      _id: [performanceInstance ? performanceInstance._id : null],
      player: [performanceInstance ? performanceInstance.player._id : null, Validators.required],
      rating: [performanceInstance ? performanceInstance.rating : null, Validators.required],
      kills: [performanceInstance ? performanceInstance.kills : null, Validators.required],
      assists: [performanceInstance ? performanceInstance.assists : null, Validators.required],
      deaths: [performanceInstance ? performanceInstance.deaths : null, Validators.required],
      match:[]
    });
  }

  fperformace(i) { return this.performances.controls[i]; }

  salvarPerformace(i){
    const formPerformance = this.performances.controls[i];

    this.submitted = true;
    if (formPerformance.invalid) {
      console.log("invalido")
      return;
    }

    formPerformance.value.player = {_id: formPerformance.value.player}
    formPerformance.value.match = {_id: this.form.get("_id").value}

    if (formPerformance.get("_id").value) {
      //editar
      this.performanceService.update(formPerformance.get("_id").value, formPerformance.value)
        .subscribe(
          data => {
            this.toastr.success('Dados salvos', 'Editado com Sucesso!', {
              positionClass: "toast-top-center",
            });
          },
          error => {
            console.log(error)
            // this.loading = false;
          });
    } else {
      this.performanceService.create(formPerformance.value)
        .subscribe(
          data => {
            this.form.get("_id").setValue(data._id);

            this.toastr.success('Dados salvos', 'Cadastrado com Sucesso!', {
              positionClass: "toast-top-center",
            });
          },
          error => {
            console.log(error)
            // this.loading = false;
          });
    }


  }

  buscarMembrosTime(_id) {
    this.timeService.buscarUsuariosMembros(_id)
      .subscribe(
        data => {
          this.usuariosList = data;
        },
        error => {
          console.log(error)
        });
  }
}