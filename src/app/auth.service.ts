import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Method to register a new user (store their data)
  signup(email: string, password: string, firstName: string, lastName: string): void {
    // Get existing users from localStorage (if any)
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const userExists = users.some((user: { email: string }) => user.email === email);
    
    if (userExists) {
      alert('Email déjà utilisé');
      return;
    }

    // Create a new user object
    const newUser = { email, password, firstName, lastName };

    // Add new user to the users array
    users.push(newUser);

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Utilisateur enregistré:', newUser);
  }

  // Method to authenticate user (login)
  login(email: string, password: string): boolean {
    // Retrieve the list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find the user by email and compare the password
    const user = users.find((u: { email: string, password: string }) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));  // Store logged-in user data
      return true;  // Successful login
    }

    return false;  // Authentication failed
  }

  // Check if a user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('loggedInUser') !== null;  // Return true if logged-in user is found in localStorage
  }

  // Method to logout the user
  logout(): void {
    localStorage.removeItem('loggedInUser');  // Remove logged-in user from localStorage
  }
}
