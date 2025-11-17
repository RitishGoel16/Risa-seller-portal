import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';
import e from 'express';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productData: undefined | Product;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }
  productQuantity: number = 1;
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getProductByProductId(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data[0];
    });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
}