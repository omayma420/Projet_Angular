import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    const { email, password } = this.loginData;

    // Validation des champs
    if (!email || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (!this.validateEmail(email)) {
      alert('Veuillez entrer un email valide');
      return;
    }

    // Vérifier les identifiants
    if (this.authService.login(email, password)) {
      console.log('Login réussi avec :', this.loginData);
      this.router.navigate(['/reservation']);  
    } else {
      console.log('Échec de l\'authentification');
      alert('Identifiants incorrects !');
    }
  }

  // Fonction pour valider l'email
  validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
}
