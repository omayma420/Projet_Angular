import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service'; // Importer le service CartService
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  totalPrice: number = 0; // Variable pour stocker le total des prix des articles

  constructor(
    private fb: FormBuilder,
    private cartService: CartService // Injecter le service CartService
  ) {
    // Initialiser le formulaire
    this.reservationForm = this.fb.group({
      nomPrenom: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // 8 chiffres
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTotalPrice(); // Charger la somme des prix au démarrage
  }

  /**
   * Charger la somme totale des prix des articles dans le panier.
   */
  loadTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice(); // Récupérer la somme depuis le service
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formData = this.reservationForm.value;

      // Créer une instance jsPDF pour générer la facture
      const doc = new jsPDF();

      // Ajouter un titre avec couleur de fond
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(30);
      doc.setTextColor(255, 255, 255); // Texte blanc
      doc.setFillColor(43, 122, 43); // Fond vert
      doc.rect(0, 0, 210, 30, 'F'); // Rectangle pour le titre
      doc.text('Facture de Réservation', 105, 20, { align: 'center' });

      // Ajouter une ligne sous le titre
      doc.setDrawColor(43, 122, 43); // Ligne verte
      doc.setLineWidth(2);
      doc.line(10, 35, 200, 35);

      // Ajouter les détails de la réservation
      doc.setFillColor(240, 240, 240); // Fond gris clair
      doc.rect(10, 40, 190, 100, 'F'); // Rectangle de fond gris clair

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Texte noir

      let currentY = 50; // Position Y initiale

      doc.text(`Nom et Prénom : ${formData.nomPrenom}`, 20, currentY);
      currentY += 12;
      doc.text(`Téléphone : ${formData.phone}`, 20, currentY);
      currentY += 12;
      doc.text(`Email : ${formData.email}`, 20, currentY);
      currentY += 12;
      doc.text(`Adresse : ${formData.adresse}`, 20, currentY);
      currentY += 12;

      // Ajouter la somme totale des prix
      doc.text(`Total : ${this.totalPrice} TND`, 20, currentY);
      currentY += 20;

      // Message de remerciement
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(16);
      doc.setTextColor(43, 122, 43); // Texte vert
      doc.text('Merci pour votre réservation !', 105, currentY, { align: 'center' });

      // Footer avec info entreprise
      currentY += 30;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100); // Texte gris
      doc.text('www.votre-entreprise.com', 105, currentY, { align: 'center' });

      // Sauvegarder le PDF
      doc.save('facture-reservation.pdf');

      alert('Réservation réussie, la facture a été téléchargée.');
    } else {
      alert('Veuillez remplir correctement le formulaire');
    }
    this.cartService.clearCart();

  }
}
