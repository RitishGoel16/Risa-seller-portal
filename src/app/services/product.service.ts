import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../data-type';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  // POST: Add product
  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  // GET: Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // (Optional) GET: Fetch product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getProduct(id: String) {
    return this.http.get<Product[]>(`${this.apiUrl}?sellerId=${id}`);
  }
  getProductByProductId(id: string) {
    return this.http.get<Product[]>(`${this.apiUrl}?id=${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
  popularProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?_limit=4`);
  }
  trendyProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }
  SearchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products?q=${query}');
  }

}
