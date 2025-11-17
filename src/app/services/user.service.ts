import { Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private router:Router) { }

  userSignUp(user: SignUp) {
    console.log(user);
    this.http.post('http://localhost:3000/Users', user).subscribe((result) => {
      console.log(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['/']);
      }
    });
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

}
