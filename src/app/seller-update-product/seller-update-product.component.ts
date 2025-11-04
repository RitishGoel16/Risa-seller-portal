import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {

  productData: undefined | Product

  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  productAddedMessage: string | undefined;

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getProduct(productId as string).subscribe((data) => {
      console.log(data);
      this.productData = data[0];
    });
  }

  // Submit(data: Product) {

  //   if (this.productData) {
  //     data.id = this.productData.id;
  //   }
  //   this.product.updateProduct(data).subscribe((result) => {
  //     console.log('Product updated successfully', result);
  //     if (result) {
  //       this.productAddedMessage = 'Product updated successfully!';
  //     }
  //     setTimeout(() => {
  //       this.productAddedMessage = undefined;
  //       this.router.navigateByUrl('/seller-home');
  //     }, 3000);
  //   });
  // }

  timeoutId: any;

  Submit(data: Product) {
    if (!this.productData) return;

    const updatedProduct: Product = { ...this.productData, ...data };

    this.product.updateProduct(updatedProduct).subscribe((result) => {
      console.log('Product updated successfully', result);
      if (result) {
        this.productAddedMessage = 'Product updated successfully!';

        // save timeout ID
        this.timeoutId = setTimeout(() => {
          this.productAddedMessage = undefined;
          if (this.router) { // check if router still exists
            this.router.navigate(['/seller-home']);
          }
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }


}
