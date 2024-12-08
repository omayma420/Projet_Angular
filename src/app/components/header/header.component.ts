import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = ''; // La requête de recherche
  searchResults: any[] = []; // Résultats de recherche

  constructor(private router: Router, private productService: ProductService) {}

  handleSearch(): void {
    const trimmedQuery = this.searchQuery.trim();

    if (trimmedQuery) {
      // Effectuer la recherche des produits
      this.productService.searchProducts(trimmedQuery).subscribe(
        (products) => {
          this.searchResults = products; // Mettre à jour les résultats
          console.log(`Produits trouvés :`, this.searchResults);
          // Vous pouvez rediriger vers une page de résultats ou afficher les résultats dans le même composant
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
}
