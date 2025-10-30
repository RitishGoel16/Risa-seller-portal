import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productAddedMessage: string | undefined;
Submit(data:any){
  console.log(data);
}
}
