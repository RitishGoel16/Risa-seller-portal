import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SellerService } from '../services/seller.service';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

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
  searchResult: undefined | Product[];
  userName: string = '';
  constructor(
    private router: Router,
    private seller: SellerService,
    private product: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  logout() {
    this.seller.logout(); // clears BehaviorSubject & localStorage
    this.sellerName = ''; // clear UI name
    this.menuType = 'default';
  }
  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }

  SearchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      const value = element.value.trim().toLowerCase();
      if (!value) {
      this.searchResult = undefined; // Hide suggestions if input empty
      return;
    }
      this.product.SearchProducts(element.value).subscribe((data) => {
        console.log(data);
        if(data.length>5){
          data.length=5;
        }
        
        // this.searchResult = data;
        this.searchResult = data.filter((product: Product) =>
          product.name.toLowerCase().includes(element.value.toLowerCase()) ||
          product.category.toLowerCase().includes(element.value.toLowerCase())
        );
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val:string){
    console.warn(val);
    this.router.navigate([`/search/${val}`]);
  }
  
  redirectToDetails(id:number){
    this.router.navigate(['/details/'+id])
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
        }else if (localStorage.getItem('user')){
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else {
          this.menuType = 'default';
        }
      }
    });
  }
}
