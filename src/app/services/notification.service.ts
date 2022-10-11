import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showCreateSuccess(message = "Cadastrado com Sucesso!", title = "Dados salvos") {
    this.toastr.success(message, title, {
      positionClass: "toast-top-center",
    });
  }

  showUpdateSuccess(message = "Atulizado com Sucesso!", title = "Dados salvos") {
    this.toastr.success(message, title, {
      positionClass: "toast-top-center",
    });
  }

  showDeleteSuccess(message = "Deletado com Sucesso!", title = "Dados salvos") {
    this.toastr.success(message, title, {
      positionClass: "toast-top-center",
    });
  }

  showError(message = "Ocorreu um erro na operação!", title = "Erro") {
    this.toastr.error(message, title, {
      positionClass: "toast-top-center",
    });
  }


}