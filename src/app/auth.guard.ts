// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   // constructor(private sellerService: SellerService, private router: Router) {}
//   return this.sellerService.isSellerLoggedIn;
// };
import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService); // ✅ inject service
  const router = inject(Router);               // ✅ inject router

  if (sellerService.isSellerLoggedIn.value) {
    return true;  // allow access
  } else {
    router.navigate(['']);  // redirect
    return false; // deny access
  }
};
