import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUserSubject = new BehaviorSubject(false);
  url = environment.url;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.currentUserSubject.next(true);
    }
  }

  public get currentUserValue(): boolean {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http
      .post<any>(`${this.url}/login`, {
        email: email.trim(),
        password: password.trim(),
      })
      .pipe(
        map((res) => {
          console.log(res);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', res.token);
          this.currentUserSubject.next(true);
          return res;
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    this.currentUserSubject.next(false);
  }
}
