import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PerformanceService { //performance service

  constructor( private http: HttpClient,){
  }

  create(performance: any) {
    return this.http.post<any>(`${environment.apiUrl}/performance`, performance)
  }

  getAllByMatchId(id) {
    return this.http.get<any[]>(`${environment.apiUrl}/performance/find-performaces-match/${id}`,);
  }

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/performance`,);
  }

  getById(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/performance/${id}`);
  }

  remove(id: string) {
    return this.http.delete<any>(`${environment.apiUrl}/performance/${id}`);
  }
 
  update(id, params) {
    return this.http.put<any>(`${environment.apiUrl}/performance/${id}`, params)
      .pipe(map(x => {
        return x;
      }));
  }

}