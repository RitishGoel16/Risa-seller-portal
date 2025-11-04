import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seller-auth',
  imports: [CommonModule, FormsModule,],
  standalone: true,
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin = false;
  loginError: string = '';
  constructor(private seller: SellerService, private router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') { // ✅ Only run in browser
      const sellerData = localStorage.getItem('seller');
      if (sellerData) {
        this.seller.setLoginStatus(true);
        this.router.navigate(['seller-home']);
      }
    }
  }


  signUp(data: SignUp): void {
    this.seller.userSignUp(data).subscribe((result) => {
      if (result) {
        alert('Login successful! 🎉');   // ✅ Show success alert
        this.seller.setLoginStatus(true);
        this.router.navigate(['seller-home']);
      }
    });
  }
  login(data: SignUp): void {
    this.loginError = ''; // reset previous error

    if (!data.email || !data.password) {
      this.loginError = 'Please enter both email and password.';
      return;
    }

    this.seller.userLogin(data).subscribe({
      next: (result: any) => {
        if (result && result.body ? result.body.length > 0 : result.length > 0) {
          alert('Login successful! 🎉');
          if (typeof window !== 'undefined') {
            localStorage.setItem('seller', JSON.stringify(result.body[0]));
          }
          this.seller.setLoginStatus(true);
          this.router.navigate(['seller-home']);
        } else {
          // ❌ Invalid credentials
          this.showLoginError('Email or password is not correct.');
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        // ❌ Server or API error
        this.showLoginError('Something went wrong while logging in.');
      }
    });
  }

  showLoginError(message: string): void {
    this.loginError = message;
    setTimeout(() => {
      this.loginError = ''; // auto clear after few seconds
    }, 4000);
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
}
