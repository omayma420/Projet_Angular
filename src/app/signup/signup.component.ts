import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = { firstName: '', lastName: '', email: '', password: '' };
  
  constructor(private router: Router, private authService: AuthService) {}

  onSignup() {
    const { firstName, lastName, email, password } = this.signupData;

    // Validation des champs
    if (!firstName || !lastName || !email || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (!this.validateEmail(email)) {
      alert('Veuillez entrer un email valide');
      return;
    }

    if (password.length < 6) {
      alert('Le mot de passe doit comporter au moins 6 caractères');
      return;
    }

    // Enregistrement de l'utilisateur
    this.authService.signup(email, password, firstName, lastName);

    // Rediriger vers la page de connexion après inscription
    this.router.navigate(['/login']);
  }

  // Fonction pour valider l'email
  validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
}
