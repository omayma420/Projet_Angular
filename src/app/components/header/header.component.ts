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
  allProducts: any[] = []; // Liste de tous les produits (vous pouvez la remplir avec les produits par défaut)
  showAllProducts: boolean = true; // Contrôle l'affichage des produits (true pour tous, false pour les résultats de recherche)

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

    // Charger tous les produits par défaut (si vous avez un service pour cela)
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products; // Vous devez récupérer tous les produits par défaut ici
    });
  }

  // Fonction de recherche
  handleSearch(): void {
    const trimmedQuery = this.searchQuery.trim();

    if (trimmedQuery) {
      this.productService.searchProducts(trimmedQuery).subscribe(
        (products) => {
          this.searchResults = products; // Mettre à jour les résultats de la recherche
          console.log(`Produits trouvés :`, this.searchResults);

          // Masquer les autres produits lorsque la recherche est effectuée
          this.showAllProducts = false; // Masquer les produits par défaut
        },
        (error) => {
          console.error('Erreur lors de la recherche', error);
        }
      );
    } else {
      alert('Veuillez entrer un mot-clé pour rechercher.');
    }
  }

  // Fonction pour ajouter un produit au panier
  addToCart(product: any): void {
    this.cartService.addToCart(product); // Ajouter le produit au panier
    alert(`${product.name} a été ajouté au panier !`);

    // Réinitialiser les résultats de la recherche après l'ajout au panier
    this.searchResults = []; // Vider les résultats de recherche
    this.showAllProducts = true; // Réafficher tous les produits par défaut

    // Réinitialiser le champ de recherche
    this.searchQuery = ''; // Effacer le texte dans le champ de recherche

  
  }

  // Navigation vers la page de connexion
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Navigation vers la page du panier
  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
