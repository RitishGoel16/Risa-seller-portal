import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  productAddedMessage: string | undefined;
  constructor(private product: ProductService) { }
  ngOnInit(): void {
  }
  Submit(data: object) {
    console.log(data);
    this.product.addProduct(data as Product).subscribe((result) => {
      console.log('Product added successfully', result);
      if (result) {
        this.productAddedMessage = 'Product added successfully!';
      }
      setTimeout(() => { this.productAddedMessage = undefined }, 3000);
    })
  }
}
