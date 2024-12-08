import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  /**
   * Enregistre un nouvel utilisateur en localStorage
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @param firstName Prénom de l'utilisateur
   * @param lastName Nom de famille de l'utilisateur
   */
  signup(email: string, password: string, firstName: string, lastName: string): void {
    // Récupérer les utilisateurs existants
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Vérifier si l'email existe déjà
    const userExists = users.some((user: { email: string }) => user.email === email);
    if (userExists) {
      alert('Email déjà utilisé');
      return;
    }

    // Créer un nouvel utilisateur
    const newUser = { email, password, firstName, lastName };

    // Ajouter le nouvel utilisateur à la liste
    users.push(newUser);

    // Sauvegarder les utilisateurs en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Utilisateur enregistré :', newUser);
  }

  /**
   * Authentifie un utilisateur
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  login(email: string, password: string): boolean {
    // Récupérer la liste des utilisateurs
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Vérifier l'email et le mot de passe
    const user = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Enregistrer l'utilisateur connecté
      return true;
    }

    return false; // Échec de l'authentification
  }

  /**
   * Vérifie si un utilisateur est connecté
   * @returns true si un utilisateur est authentifié, false sinon
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('loggedInUser'); // Supprimer les informations de l'utilisateur connecté
  }
}
