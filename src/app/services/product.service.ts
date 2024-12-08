import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assets/data/product-visage.json'; // chemin vers le fichier JSON
  private apiUrl2 = 'assets/data/product-corps.json'; // chemin vers le fichier JSON

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductsCorps(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }

  // Méthode de recherche par nom
  searchProducts(query: string): Observable<any[]> {
    return new Observable((observer) => {
      // Récupérer les produits des deux fichiers
      this.http.get<any[]>(this.apiUrl).subscribe((products) => {
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        this.http.get<any[]>(this.apiUrl2).subscribe((productsCorps) => {
          const filteredProductsCorps = productsCorps.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          observer.next([...filteredProducts, ...filteredProductsCorps]);
          observer.complete();
        });
      });
    });
  }
}
