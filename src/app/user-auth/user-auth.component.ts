import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  showLogin:boolean = true;
  constructor(private user: UserService) { }

  // ngOnInit(): void {
  //   this.user.userAuthReload();
  // }

  signUp(data: SignUp) {
    console.log('Signup form data:', data);
    this.user.userSignUp(data)
  }

  login(data: Login){
    console.log(data);
  }
  
  openSignup(){
    this.showLogin=false;
  }

  openLogin(){
    this.showLogin=true;
  }
}
