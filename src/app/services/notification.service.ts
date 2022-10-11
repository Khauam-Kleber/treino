import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showCreateSuccess(message = "Cadastrado com Sucesso!", title = "Dados salvos"){
    this.toastr.success(message, title, {
      positionClass: "toast-top-center",
    });
      // this.toastr.success(message, title)
  }

  
}