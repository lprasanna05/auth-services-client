import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from './model/User';
import {JwtResponse} from './model/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) { }

  register(userData: User): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${baseUrl}/register`, userData).pipe(
      tap((res: JwtResponse) => {
        if (res.user) {
          localStorage.set('ACCESS_TOKEN', res.user.access_token);
          localStorage.set('EXPIRES_IN', res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  signIn(userData: User): Observable<JwtResponse> {
    return this.httpClient.post(`${baseUrl}/login`, userData).pipe(
      tap(async (res: JwtResponse) => {

        if (res.user) {
          localStorage.setItem('ACCESS_TOKEN', res.user.access_token);
          localStorage.setItem('EXPIRES_IN', String(res.user.expires_in));
          this.authSubject.next(true);
        }
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    this.authSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return  this.authSubject.asObservable();
  }
}
