import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { TimeService } from 'src/app/services/time.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.scss']
})
export class TimeFormComponent implements OnInit {

  team;
  form;
  submitted = false;
  usuariosList = [];

  constructor(private formBuilder: FormBuilder, private timeService: TimeService, private toastr: ToastrService, private usuarioService: UsersService) {
    // this.criarForm();
    if (this.usuarioService.userValue.data.teamId) {
      this.buscarMembrosTime(this.usuarioService.userValue.data.teamId);
      this.timeService.getById(this.usuarioService.userValue.data.teamId).subscribe(
        data => {
          this.criarForm(data);
        },
        error => {

        });
    } else {
      this.criarForm();
    }
  }


  ngOnInit(): void {
    //verificar se usuario ja tem team, caso tenha puxar os dados e setar no form
  }

  criarForm(team?) {
    var data = []
    if (team && team.users) {
      data = team.users.map(function (obj) {
        return obj._id;
      });
    }
    this.form = this.formBuilder.group({
      _id: [team ? team._id : null],
      name: [team ? team.name : '', Validators.required],
      users: [data],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  criarNovoMembro(membro) {
    let novoUser = { _id: null, name: membro, team: { _id: this.form.get("_id").value } }
    this.usuarioService.create(novoUser)
      // .pipe(first())
      .subscribe(
        data => {
          this.usuariosList.push(data);
          this.usuariosList = [...this.usuariosList]
          // this.form.get('users').setValue();

          let valoresSelecionados = this.form.get('users').value;
          valoresSelecionados.push(data._id);
          this.form.get('users').setValue(valoresSelecionados)

          // this.toastr.success('Faça o login!', 'Cadastrado com Sucesso', {
          //     positionClass: "toast-top-center",
          // });
        },
        error => {
          this.toastr.error("Nome já existe", 'Erro!', {
            positionClass: "toast-top-center",
          });
          // this.loading = false;
        });
  }

  removerMembro(event) {
    console.log(event);

    this.usuarioService.remove(event.value._id)
      .subscribe(
        data => {
          this.toastr.success('Membro removido com Sucesso', 'Removido!', {
              positionClass: "toast-top-center",
          });
        },
        error => {
          // this.toastr.error("Nome já existe", 'Erro!', {
          //   positionClass: "toast-top-center",
          // });
          // this.loading = false;
        });
  }


  salvar() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log("invalido")
      return;
    }


    let dados = this.form.value;
    if (dados.usuarios != undefined) {

      let data = dados.usuarios.map(function (obj) {
        return { _id: obj._id };
      });

      dados.usuarios = data;
    }


    // this.loading = true;
    if (this.form.get("_id").value) {
      //editar
      this.timeService.update(this.form.get("_id").value, dados)
        // .pipe(first())
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
      this.timeService.create(dados)
        // .pipe(first())
        .subscribe(
          data => {
            this.form.get("_id").setValue(data._id);
            this.usuarioService.userValue.data.teamId = data._id;
            this.usuarioService.updateCurrentUser(this.usuarioService.userValue);

            //buscar o usuario logado para a lista de usuarios
            this.buscarMembrosTime(data._id);

            //deixar global no componente
            //colocar o usuario logado ja selecionado no select
            let valoresSelecionados = this.form.get('users').value;
            valoresSelecionados.push(data.users[0]._id);
            this.form.get('users').setValue(valoresSelecionados)

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

  buscarMembrosTime(_id) {
    this.timeService.buscarUsuariosMembros(_id)
      .subscribe(
        data => {
          this.usuariosList = data;
          this.usuariosList[0].disabled = true;
        },
        error => {
          console.log(error)
        });
  }

}
