import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PartidaService { //matches service

  constructor( private http: HttpClient,){
  }

  create(match: any) {
    return this.http.post<any>(`${environment.apiUrl}/matches`, match)
  }

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/matches`,);
  }

  buscarPartidasTime(filter = '', id?: string, sort = 'id', sortOrder = 'desc', pageNumber = 0, pageSize = 10): Observable<any> {
    let stringBusca = '';
    if (filter) {
        stringBusca += `filter:${filter}`;
    }
    if (id) {
        stringBusca.trim().length !== 0 ? stringBusca += ',' : stringBusca += '';
        stringBusca += `id:${id}`;
    }
  
    return this.http.get<any>(`${environment.apiUrl}/matches/search?q=` + stringBusca, {
        params: new HttpParams()
            .set('sort', sort + ',' + sortOrder)
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString())
        }).pipe(map(res => {
            // if (returnContent) return res.content;
            return res;
        })
    );
  }


  getById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/matches/${id}`);
  }

  remove(id: string) {
    return this.http.delete<any>(`${environment.apiUrl}/matches/${id}`);
  }
 
  update(id, params) {
    return this.http.put<any>(`${environment.apiUrl}/matches/${id}`, params)
      .pipe(map(x => {
        return x;
      }));
  }

}