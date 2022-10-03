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

  time;
  form;
  submitted = false;
  usuariosList = [];
  // [{ id: 1, nome: 'Volvo' },
  // { id: 2, nome: 'Saab' },
  // { id: 3, nome: 'Opel' },
  // { id: 4, nome: 'Audi' }];

  constructor(private formBuilder: FormBuilder, private timeService: TimeService, private toastr: ToastrService, private usuarioService: UsersService) {
    // this.criarForm();
    if (this.usuarioService.userValue.data.time) {
      this.buscarMembrosTime(this.usuarioService.userValue.data.time.id);
      this.timeService.getById(this.usuarioService.userValue.data.time.id).subscribe(
        data => {
          console.log(data);
          this.criarForm(data);
        },
        error => {

        });
    } else {
      this.criarForm();
    }
  }


  ngOnInit(): void {
    //verificar se usuario ja tem time, caso tenha puxar os dados e setar no form

  }

  criarForm(time?) {
    var data = []
    if (time && time.usuarios) {
      data = time.usuarios.map(function (obj) {
        return obj.id;
      });
    }
    this.form = this.formBuilder.group({
      id: [time ? time.id : ''],
      nome: [time ? time.nome : '', Validators.required],
      usuarios: [data],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  criarNovoMembro(membro) {
    let novoUser = { id: null, nome: membro, time: { id: this.form.get("id").value } }
    this.usuarioService.create(novoUser)
      // .pipe(first())
      .subscribe(
        data => {
          this.usuariosList.push(data);
          this.usuariosList = [...this.usuariosList]
          console.log(this.usuariosList)
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

    this.usuarioService.remove(event.value.id)
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
        return { id: obj.id };
      });

      dados.usuarios = data;
    }


    // this.loading = true;
    if (this.form.get("id").value) {
      //editar
      this.timeService.update(this.form.get("id").value, dados)
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
            this.form.get("id").setValue(data.id);
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

  buscarMembrosTime(id) {
    this.timeService.buscarUsuariosMembros(id)
      .subscribe(
        data => {
          // console.log(data)
          this.usuariosList = data;
        },
        error => {
          console.log(error)
          // this.loading = false;
        });
  }

}
