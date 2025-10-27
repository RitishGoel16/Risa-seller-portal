import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sellerName: string = '';
  private isBrowser: boolean;
  menuType: String = 'default';

  constructor(
    private router: Router,
    private seller: SellerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  logout() {
    this.seller.logout(); // clears BehaviorSubject & localStorage
    this.sellerName = ''; // clear UI name
    this.menuType = 'default';
  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url && this.isBrowser) {
        const sellerData = localStorage.getItem('seller');
        if (sellerData && val.url.includes('seller')) {
          console.log('in seller area');
          this.menuType = 'seller';
          const sellerObj = JSON.parse(sellerData);
          this.sellerName = sellerObj.name || sellerObj.username || '';
        }
        else {
          this.menuType = 'default';
        } 
      }
    });
  }
}
