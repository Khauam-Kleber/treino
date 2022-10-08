import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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

    create(teams: any) {
        return this.http.post<any>(`${environment.apiUrl}/teams`, teams)
    }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/teams`);
    }

    buscarUsuariosMembros(id) {
        return this.http.get<any[]>(`${environment.apiUrl}/users/team-users/${id}`);
    }

    buscarTimesContras() {
        return this.http.get<any>(`${environment.apiUrl}/teams/againsts/teams`);
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/teams/${id}`);
    }

    remove(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/teams/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/teams/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

}