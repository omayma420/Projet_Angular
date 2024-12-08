import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductVisageComponent } from './components/product-visage/product-visage.component';
import { ProductCorpsComponent } from './components/product-corps/product-corps.component';  
import { CartComponent } from './components/carts/carts.component'; // Importer le composant du panier
import { SignupComponent } from './components/signup/signup.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Redirige vers la page d'accueil

  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'visage', component: ProductVisageComponent },
  { path: 'corps', component: ProductCorpsComponent },
  { path: 'cart', component: CartComponent }, 
  { path: 'reservation' , component: ReservationFormComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
