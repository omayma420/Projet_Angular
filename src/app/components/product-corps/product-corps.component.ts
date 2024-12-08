import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Importez le service
import { CartService } from '../../services/cart.service'; // Importer le service

@Component({
  selector: 'app-product-corps',
  templateUrl: './product-corps.component.html',
  styleUrls: ['./product-corps.component.css']
})
export class ProductCorpsComponent implements OnInit {

  products: any[] = [];  // Tableau pour stocker les produits

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();  // Charger les produits au démarrage
  }

  loadProducts(): void {
    this.productService.getProductsCorps().subscribe(  // Utilisation du bon nom de méthode
      (data) => {
        this.products = data;  // Affecter les données reçues au tableau de produits
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  // Ajouter un produit au panier
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert(`${product.name} a été ajouté au panier !`);
  }
}