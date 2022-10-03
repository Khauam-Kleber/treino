import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TimeService { 

    constructor(
        private http: HttpClient,
    ) {
     
    }

    create(time: any) {
        return this.http.post<any>(`${environment.apiUrl}/time`, time)
    }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/time`);
    }

    buscarUsuariosMembros(id) {
        return this.http.get<any[]>(`${environment.apiUrl}/usuario/time-membros/${id}`);
    }

    buscarTimesContras() {
        return this.http.get<any[]>(`${environment.apiUrl}/time/times-contra`);
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/time/${id}`);
    }

    remove(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/time/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/time/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

}