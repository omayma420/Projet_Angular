import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importer le service Router
import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Articles dans le panier

  constructor(
    private cartService: CartService, // Service pour gérer le panier
    private authService: AuthService, // Service pour gérer l'authentification
    private router: Router // Router pour naviguer entre les pages
  ) {}

  ngOnInit(): void {
    this.loadCartItems(); // Charger les articles lors de l'initialisation
  }

  /**
   * Charger les articles du panier depuis le service.
   */
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  /**
   * Supprimer un article spécifique du panier.
   * @param productId L'identifiant du produit à supprimer.
   */
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId); // Supprimer l'article via le service
    this.loadCartItems(); // Recharger les articles après la suppression
    console.log('Produit supprimé, ID :', productId);
  }

  /**
   * Vider complètement le panier.
   */
  clearCart(): void {
    this.cartService.clearCart(); // Vider le panier via le service
    this.cartItems = []; // Réinitialiser les articles localement
    console.log('Panier vidé.');
  }

  /**
   * Gérer la redirection en fonction de l'état de l'utilisateur.
   */
  handleOrder(): void {
      this.router.navigate(['/login']);
  }
 
}
