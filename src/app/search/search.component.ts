import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
 
  searchresult:undefined|Product[];
  constructor(private activeRoute:ActivatedRoute, private product:ProductService) {}
  zoomImage: string | null = null;
  zoomPos = { x: 0, y: 0 };
  zoomBackgroundPosition = 'center';

  ngOnInit(): void{
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.SearchProducts(query).subscribe((result)=>{
    this.searchresult = result.filter((item: Product) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()))
    })
  }
  // ✅ Keep these outside ngOnInit()
  // onMouseMove(event: MouseEvent, imageUrl: string) {
  //   this.zoomImage = imageUrl;

  //   // Position the zoom window
  //   this.zoomPos = { x: event.pageX + 20, y: event.pageY - 100 };

  //   const target = event.target as HTMLElement;
  //   const rect = target.getBoundingClientRect();

  //   // Calculate background position relative to cursor
  //   const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  //   const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
  //   this.zoomBackgroundPosition = `${xPercent}% ${yPercent}%`;
  // }

  // onMouseLeave() {
  //   this.zoomImage = null;
  // }
}

