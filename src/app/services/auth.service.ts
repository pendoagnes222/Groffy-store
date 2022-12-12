import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

interface AuthResponse {
  status: string;
  success: Boolean;
  token: string;
  userId: string;
}

interface loginResponse {
  status: string;
  success: Boolean;
  
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  authToken: string = undefined;
  userId: string = undefined;
   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHTTPMsgService) {
   }

  //  checkJWTtoken() {
  //    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
  //    .subscribe({
  //      next(res)  {
  //      console.log('JWT Token Valid: ', res);
       
  //    },
  //    error(err) { 
  //       console.log('JWT Token invalid: ', err);
  //       }
  //   });
  //  }

   
   loadUserCredentials() {
     const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
     console.log('loadUserCredentials ', credentials);
     if (credentials && credentials.username !== undefined) {
       this.useCredentials(credentials);
       if (this.authToken) {
       // this.checkJWTtoken();
       }
     }
   }

   storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

   useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.authToken = credentials.token;
     this.userId = credentials.userId;
   }

   destroyUserCredentials() {
     this.authToken = undefined;
     this.isAuthenticated = false;
     localStorage.removeItem(this.tokenKey);
   }

   signUp(user: any) {
    return this.http.post<loginResponse>(baseURL + "users/signup",
     {
       username: user.username,
       password: user.password,
       firstname: user.firstname,
       lastname: user.lastname,
       address: user.address
     })
     .pipe(catchError(this.processHTTPMsgService.handleError));
}

   logIn(user: any): Observable<any> {
     return this.http.post<AuthResponse>(baseURL + 'users/login',
       {'username': user.username, 'password': user.password})
       .pipe(map(res => {
           this.storeUserCredentials({username: user.username, token: res.token, userId: res.userId});
           return {'success': true, 'username': user.username };
       }),
        catchError((error) => this.processHTTPMsgService.handleError(error)));
   }

   logOut() {
     this.destroyUserCredentials();
     window.location.reload();
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   

   getToken(): string {
     return this.authToken;
   }
}
