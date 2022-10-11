import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { PartidaService } from "src/app/services/partida.service";
import { UsersService } from "src/app/services/users.service";
import { TimeService } from "src/app/services/team.service";
import { PerformanceService } from "src/app/services/performance.service";
import { MatStepper } from "@angular/material/stepper";
import { formatDate } from "@angular/common";
import { NotificationService } from "src/app/services/notification.service";

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

  @ViewChild('stepper') myStepper: MatStepper;
  constructor(
    private formBuilder: FormBuilder,
    private partidaService: PartidaService,
    private timeService: TimeService,
    public dialogRef: MatDialogRef<PartidaFormComponent>,
    public usuarioService: UsersService,
    private notificationService: NotificationService,
    public performanceService: PerformanceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buscarTimesContras(this.usuarioService.userValue.data.teamId);
    this.criarForm(this.data.partida);
  }

  ngOnInit(): void {
  }

  criarForm(partida?) {
    this.form = this.formBuilder.group({
      _id: [partida ? partida._id : null],
      teamHome: [{_id: this.usuarioService.userValue.data.teamId}],
      teamAgainst: [partida.teamAgainst ? partida.teamAgainst._id : null, Validators.required],
      date:[partida && partida.date ? this.convertDateIsoTimezone(partida.date) : (new Date()).toISOString().slice(0, 16), Validators.required],
      scoreboardTeamAgainst: [partida ? partida.scoreboardTeamAgainst : null, Validators.required],
      scoreboardTeamHome: [partida ? partida.scoreboardTeamHome : null, Validators.required],
      learnings: [partida ? partida.learnings : null, Validators.required],
      roundsToObserve: [partida ? partida.roundsToObserve : null, Validators.required]
    });
  }

  convertDateIsoTimezone(dateConvert){
    var date = new Date(dateConvert);
    var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return isoDateTime.slice(0, 16);
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

    // this.form.value.teamHome = {_id: this.usuarioService.userValue.data.teamId};

    // this.loading = true;
    if (this.form.get("_id").value) {
      //editar
      this.partidaService.update(this.form.get("_id").value, this.form.value)
        .subscribe(
          data => {
            this.notificationService.showCreateSuccess();
            this.myStepper.next();
            this.submitted = false;
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
            this.notificationService.showCreateSuccess();
            this.myStepper.next();
            this.submitted = false;
          },
          error => {
            console.log(error)
            // this.loading = false;
          });
    }
  }

  criarNovoTime(team) {
    let novoTime = { _id: null, name: team, teamOwner: { _id: this.usuarioService.userValue.data.teamId } }
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
          this.notificationService.showCreateSuccess();
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

  abaPerformace(event) {

    if (event.selectedIndex === 1) {
      this.buscarMembrosTime(this.usuarioService.userValue.data.teamId);

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

    } else {
      this.performances.clear()
      // this.performances = new FormArray([]);
    }
  }

  addPerformaceForm() {
    this.performances.push(this.criarFormPerformaces())
  }

  //talvez fazer o módulo de performance separado em outro componente para não gargalhar este!
  criarFormPerformaces(performanceInstance?) {
    return this.formBuilder.group({
      _id: [performanceInstance ? performanceInstance._id : null],
      player: [performanceInstance && performanceInstance.player ? performanceInstance.player._id : null, Validators.required],
      rating: [performanceInstance ? performanceInstance.rating : null, Validators.required],
      kills: [performanceInstance ? performanceInstance.kills : null, Validators.required],
      assists: [performanceInstance ? performanceInstance.assists : null, Validators.required],
      deaths: [performanceInstance ? performanceInstance.deaths : null, Validators.required],
      match: []
    });
  }

  fperformace(i) { return this.performances.controls[i]; }

  salvarPerformace(i) {
    const formPerformance = this.performances.controls[i];

    this.submitted = true;
    if (formPerformance.invalid) {
      console.log("invalido")
      return;
    }

    formPerformance.value.player = { _id: formPerformance.value.player }
    formPerformance.value.match = { _id: this.form.get("_id").value }

    if (formPerformance.get("_id").value) {
      //editar
      this.performanceService.update(formPerformance.get("_id").value, formPerformance.value)
        .subscribe(
          data => {
            this.notificationService.showCreateSuccess();
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
            this.notificationService.showCreateSuccess();

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