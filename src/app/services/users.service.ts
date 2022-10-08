import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;
    public favoritos: any = [];

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password })
            .pipe(
                // catchError(
                //     (error) => {
                //         console.log(error)
                //       return of(error);
                // }),
                map(res => {
                    console.log(res)
                    this.updateCurrentUser(res);
                    return res;
                }));

    }

    updateCurrentUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/auth/signin']);
    }

    create(user: any) {
        return this.http.post<any>(`${environment.apiUrl}/users`, user) 
    }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
    }

    
    remove(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

}
