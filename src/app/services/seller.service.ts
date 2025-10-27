import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private isBrowser = typeof window !== 'undefined';

  // Initialize safely
  isSellerLoggedIn = new BehaviorSubject<boolean>(
    this.isBrowser ? localStorage.getItem('sellerLoggedIn') === 'true' : false
  );

  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {
    if (this.isBrowser) {
      const savedLogin = localStorage.getItem('sellerLoggedIn');
      if (savedLogin === 'true') {
        this.isSellerLoggedIn.next(true);
      }
    }
  }

  userSignUp(data: SignUp): Observable<any> {
    return this.http.post('http://localhost:3000/seller', data, {
      observe: 'response'
    });
  }

  setLoginStatus(status: boolean) {
    this.isSellerLoggedIn.next(status);
    if (this.isBrowser) { 
      localStorage.setItem('sellerLoggedIn', String(status));
    }
  }

  userLogin(data: Login): Observable<any> {
    return this.http.get(
      `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    );
  }

  logout() {
    this.isSellerLoggedIn.next(false);
    if (this.isBrowser) {
      localStorage.removeItem('sellerLoggedIn'); // clear on logout
      localStorage.removeItem('seller');
    }
    this.router.navigate(['']); // redirect to home
  }
}
