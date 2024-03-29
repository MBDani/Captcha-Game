import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnsplashService } from '../servicios/unsplash.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  formJugar: FormGroup;
  mostrarAlerta: boolean = false

  carouselImagenes: string[] = [];


  constructor(private router: Router,
    private unsplashService: UnsplashService) {
    this.formJugar = new FormGroup({
      imagen_correcta: new FormControl('', Validators.required),
      imagen_incorrecta: new FormControl('', Validators.required),
      tiempo: new FormControl('', Validators.required)
    })

  }

  ngOnInit(): void {

    this.rellenarCarousel();
  }

  jugar(): void {
    if (this.formJugar.valid){
    this.unsplashService.getPhotosApi(this.formJugar.controls['imagen_correcta'].value).subscribe(correct_data => {
      this.unsplashService.getPhotosApi(this.formJugar.controls['imagen_incorrecta'].value).subscribe(incorrect_data => {
        this.router.navigate(['/pantalla', this.formJugar.controls['tiempo'].value, this.formJugar.controls['imagen_correcta'].value, this.formJugar.controls['imagen_incorrecta'].value]);
      });
    },
      (error => {
        console.error(error);
      }))
    
    }else{
      this.mostrarAlerta = true
    }
  }

  getPintaErrores(campo: string){
    return this.formJugar.controls[campo].invalid && this.formJugar.controls[campo].touched
  }
  
  ocultarAlerta(){
    this.mostrarAlerta = false
  }

  rellenarCarousel(){
    const url = '../../../assets/imagenes/carousel/'
    this.carouselImagenes.push(`${url}menu-principal.png`)
    this.carouselImagenes.push(`${url}juego.png`)
    this.carouselImagenes.push(`${url}puntuaciones.png`)
  }

}


