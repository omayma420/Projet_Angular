import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est authentifié à chaque chargement du composant
    if (!this.authService.isAuthenticated()) {
      // Rediriger vers la page de connexion si non authentifié
      this.router.navigate(['/login']);
    }
  }
}
