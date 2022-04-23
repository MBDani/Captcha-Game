import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { PantallaComponent } from './components/pantalla/pantalla.component';

const routes: Routes = [
  // { path: '', component: MenuPrincipalComponent},
  { path: 'menu-principal', component: MenuPrincipalComponent},
  { path: 'pantalla/:correct_data/:incorrect_data/:tiempo', component: PantallaComponent},
  // { path: 'pantalla', component: PantallaComponent},
  {path: '**', redirectTo: 'menu-principal'} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
