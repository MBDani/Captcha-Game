import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { PantallaComponent } from './components/pantalla/pantalla.component';
import { ErroresFormularioComponent } from './components/menu-principal/errores-formulario/errores-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    PantallaComponent,
    ErroresFormularioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
