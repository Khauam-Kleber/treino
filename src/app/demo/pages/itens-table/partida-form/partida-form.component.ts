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
  submitted = false;
  isLinear = true;

  constructor(
    private formBuilder: FormBuilder,
    private partidaService: PartidaService,
    private timeService: TimeService,
    public dialogRef: MatDialogRef<PartidaFormComponent>,
    public usuarioService: UsersService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.buscarTimesContras(this.usuarioService.userValue.data.teamId);

    this.criarForm();
  }

  ngOnInit(): void {
  }

  criarForm() {
    this.form = this.formBuilder.group({
      _id: [],
      teamAgainst: [null, Validators.required],
      scoreboardTeamAgainst: ['', Validators.required],
      scoreboardTeamHome: ['', Validators.required],
      learnings: [],
      roundsToObserve: []
    });

    // this.form.controls['quantity'].setValue( this.data.item.quantityPurchased)

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
    console.log(this.form.value)
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
    console.log(event);

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


}