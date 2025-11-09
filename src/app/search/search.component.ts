import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
 
  searchresult:undefined|Product[];
  constructor(private activeRoute:ActivatedRoute, private product:ProductService) {}

  ngOnInit(): void{
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.SearchProducts(query).subscribe((result)=>{
    this.searchresult = result.filter((item: Product) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()))
    })
  }
}
