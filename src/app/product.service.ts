import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin } from 'rxjs';

interface Product {
    id: number;
    name: string;
    price: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map(products => products.sort((a, b) => a.id - b.id))
        );
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    addProduct(product: Omit<Product, 'id'>): Observable<Product> {
        return this.getProducts().pipe(
            map(products => {
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                return { ...product, id: newId };
            }),
            switchMap(newProduct => this.http.post<Product>(this.apiUrl, newProduct))
        );
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
}
