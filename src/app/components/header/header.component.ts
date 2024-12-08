import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0; // Compteur de produits dans le panier
  searchQuery: string = ''; // Requête de recherche
  searchResults: any[] = []; // Résultats de recherche

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Initialiser le compteur avec les articles déjà dans le panier
    this.cartCount = this.cartService.getCartItems().length;

    // Souscription pour mettre à jour dynamiquement le compteur
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartCount = cartItems.length;
    });
  }

  handleSearch(): void {
    const trimmedQuery = this.searchQuery.trim();

    if (trimmedQuery) {
      this.productService.searchProducts(trimmedQuery).subscribe(
        (products) => {
          this.searchResults = products; // Mettre à jour les résultats
          console.log(`Produits trouvés :`, this.searchResults);

          // Redirection vers une page de résultats
          this.router.navigate(['/search'], { queryParams: { q: trimmedQuery } });
        },
        (error) => {
          console.error('Erreur lors de la recherche', error);
        }
      );
    } else {
      alert('Veuillez entrer un mot-clé pour rechercher.');
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
