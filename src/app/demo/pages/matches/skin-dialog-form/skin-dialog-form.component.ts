import { Component, Inject } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { PartidaService } from "src/app/services/partida.service";

@Component({
    selector: 'skin-dialog',
    templateUrl: 'skin-dialog-form.component.html',
  })
  export class SkinDialogForm {
    constructor(
      private formBuilder:FormBuilder, 
      private itensService: PartidaService,
      public dialogRef: MatDialogRef<SkinDialogForm>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {  
      this.criarForm(); 
      // this.itensService.buscarListaFavoritos();
    }
  
    form;

    criarForm(){
      this.form = this.formBuilder.group({
        quantity:  [ this.data.item.quantityPurchased  , Validators.required],
        price:  [this.data.item.pricePurchased, Validators.required ],
      });

      // this.form.controls['quantity'].setValue( this.data.item.quantityPurchased)
      
    }
    // get f() { return this.form.controls; }


    onNoClick(): void {
      this.dialogRef.close();
    }

    saveQuantityPurchase(){
      this.data.item.quantityPurchased = this.form.get('quantity').value
      this.data.item.pricePurchased = this.form.get('price').value
      this.dialogRef.close()
    }

    
  }