import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { PantallaComponent } from './components/pantalla/pantalla.component';

const routes: Routes = [
  { path: 'menu-principal', component: MenuPrincipalComponent},
  { path: 'pantalla/:tiempo/:palabra_correcta/:palabra_incorrecta', component: PantallaComponent},
  {path: '**', redirectTo: 'menu-principal'} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
