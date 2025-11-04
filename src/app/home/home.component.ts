import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbCarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor( private product:ProductService) { }

  popularProducts : undefined | Product[];

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts = data;
    })
  }
}
