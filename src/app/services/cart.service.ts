import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems'; // Clé pour le stockage local
  private currentId = 1; // Compteur pour générer des IDs uniques
  private cartItemsSubject = new BehaviorSubject<any[]>(this.getCartItems()); // BehaviorSubject pour stocker les articles
  cartItems$ = this.cartItemsSubject.asObservable(); // Observable exposé pour écouter les changements

  constructor() {
    // Initialiser `currentId` avec le plus grand ID existant dans le panier (si disponible)
    const cart = this.getCartItems();
    if (cart.length > 0) {
      this.currentId = Math.max(...cart.map((item) => item.id)) + 1;
    }
  }

  // Ajouter un produit au panier
  addToCart(product: any): void {
    const currentCart = this.getCartItems();

    // Assurez-vous que le produit a un ID unique
    const newProduct = { ...product, id: this.currentId++ };

    currentCart.push(newProduct);
    this.saveCart(currentCart);
    console.log('Produit ajouté au panier:', newProduct);
  }

  // Obtenir tous les produits dans le panier
  getCartItems(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Supprimer un produit spécifique du panier
  removeFromCart(productId: number): void {
    const currentCart = this.getCartItems();
    const updatedCart = currentCart.filter((item) => item.id !== productId);
    this.saveCart(updatedCart);
    console.log('Produit supprimé avec ID:', productId);
  }

  // Vider complètement le panier
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartItemsSubject.next([]); // Mettre à jour l'observable
    console.log('Panier vidé.');
  }

  // Sauvegarder le panier dans localStorage et mettre à jour le BehaviorSubject
  private saveCart(cart: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartItemsSubject.next(cart); // Mettre à jour l'observable
  }

  // Obtenir le nombre d'articles dans le panier
  getCartCount(): number {
    return this.getCartItems().length;
  }
}
