import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { SteamItem } from '../models/steamItem.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ItensService {
  // private url = 'https://steamfolio.com/api/Popular/sort?type=10&ascending=false&watchlist=false&searchTerm=karrigan&filterType=3';
  
  // public listFavoritesUser = [];
  // public valorRendimentoTotal: number = 0;

  // constructor(private httpClient: HttpClient, private userService: UsersService, private toastr: ToastrService) {}

  // getItensMercadoSteam(term:string, tipoItem:string){
  //   return this.httpClient.get(`${environment.apiUrl}/skin-item/find-skins/list`, 
  //     {params: 
  //       {
  //         term: term,
  //         tipoItem: tipoItem
  //       }
  //     })
  // }

  // getItemPrice (market_hash_name = 'AK-47 | Redline (Field-Tested)') {
  //   if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
  //       throw new Error('The "market_hash_name" parameter is not a valid string or missing.');
  //   }
  //      return this.httpClient.get(`https://csgobackpack.net/api/GetItemPrice/?currency=BRL&id=${market_hash_name}&time=7&icon=1`)
  // }

  // adicionarOuRemoverFavoritos(itemSteam){
   
  //     let usuarioLogado = this.userService.userValue['data']

  //     if(!this.listFavoritesUser.find(item => item.id === itemSteam.id)){
  //       if(this.listFavoritesUser.length <= 5){
  //         this.listFavoritesUser.push(new SteamItem(itemSteam))
  //       }else{
  //         this.toastr.error('Usamos API Públicas grátis que possuem limites de buscas :(', 'Máximo 6 Itens Favoritos', {
  //           positionClass: "toast-top-center",
  //         });
  //       }
  //     }else{
  //       let objIndex = this.listFavoritesUser.findIndex((obj => obj.id == itemSteam.id));
  //       this.listFavoritesUser.splice(objIndex, 1);
  //     } 
  //     usuarioLogado.steamItems = this.listFavoritesUser;
  //     this.userService.updateFavorites(usuarioLogado.id, usuarioLogado).subscribe((response:any) =>  this.buscarListaFavoritos() );
    

  // }

  // atualizarQuantidadeFavoritos(itemSteam){
  //   let usuarioLogado = this.userService.userValue['data']
  //   let itemIndex = this.listFavoritesUser.findIndex(item => item.id === itemSteam.id)
  //   this.listFavoritesUser[itemIndex] = itemSteam;

  //   usuarioLogado.steamItems = this.listFavoritesUser;
  //   this.userService.updateFavorites(usuarioLogado.id, usuarioLogado).subscribe((response:any) =>  this.buscarListaFavoritos() );
  // }

  // buscarListaFavoritos(realTimePrice = false){
  //   this.userService.getFavoritemsUser().subscribe(
  //     response => {
  //       this.listFavoritesUser = response;
  //       if(realTimePrice){
  //         this.realTimePrice();
  //       }

       
  //     },
  //     error => {
  //     });
  // }

  // verificarFavoritos(element){
  //   if(this.listFavoritesUser && this.listFavoritesUser.find(e => e.id === element.id)){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }

  // realTimePrice(){
  //   this.valorRendimentoTotal = 0;
  //   this.listFavoritesUser.forEach((item,index)=> {
  //     this.getByName(item.name).subscribe( (response:any) => {
  //       this.listFavoritesUser[index].lowest_price = response.lowest_price.replace(/[^0-9\.,]/g, "").replace(/,/g, '.')
  //       this.valorRendimentoTotal = this.valorRendimentoTotal + ((parseFloat(this.listFavoritesUser[index].lowest_price) - item.pricePurchased) * item.quantityPurchased);
  //       this.listFavoritesUser[index].volume = response.volume
  //    });
  //   });
  // }


  // getByName(name: string) {
  //   return this.httpClient.get<any>(`${environment.apiUrl}/skin-item/skin-price/${name}`);
  // }

}