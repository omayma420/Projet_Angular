import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Articles dans le panier

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems(); // Charger les articles lors de l'initialisation
  }

  // Charger les articles du panier depuis le service
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  // Supprimer un article spécifique du panier
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId); // Appeler le service pour supprimer l'article
    this.loadCartItems(); // Recharger les articles après la suppression
    console.log('Produit supprimé, ID :', productId);
  }

  // Vider complètement le panier
  clearCart(): void {
    this.cartService.clearCart(); // Appeler le service pour vider le panier
    this.cartItems = []; // Réinitialiser les articles localement
    console.log('Panier vidé.');
  }
}
