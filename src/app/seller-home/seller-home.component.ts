import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  standalone: true, // ✅ optional but good for Angular 16+
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productDeletedMessage?: string;
  productList?: Product[];
  faTrash = faTrash; // ✅ rename for clarity
  private deleteMessageTimeout?: ReturnType<typeof setTimeout>;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    console.log('Delete product with ID:', id);
    this.product.deleteProduct(id).subscribe(() => {
      this.productDeletedMessage = 'Product deleted successfully!';
      this.list();

      if (this.deleteMessageTimeout) clearTimeout(this.deleteMessageTimeout);

      this.deleteMessageTimeout = setTimeout(() => {
        this.productDeletedMessage = undefined;
      }, 3000);
    });
  }

  list() {
    this.product.getProducts().subscribe((result) => {
      this.productList = result;
    });
  }
}
