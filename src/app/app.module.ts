import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SliderComponent } from './components/slider/slider.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductVisageComponent } from './components/product-visage/product-visage.component';
import { ProductService } from './services/product.service';  // Importez le service
import { HttpClientModule } from '@angular/common/http';
import { ProductCorpsComponent } from './components/product-corps/product-corps.component';
import { CartComponent } from './components/carts/carts.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';  // Ajoute ceci
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    SliderComponent,
    LoginComponent,
    HomeComponent,
    ProductVisageComponent,
    ProductCorpsComponent,
    CartComponent,
    SignupComponent,
    ReservationFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
