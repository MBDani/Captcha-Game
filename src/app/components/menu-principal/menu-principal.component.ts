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


  constructor(private router: Router,
    private unsplashService: UnsplashService) {
    this.formJugar = new FormGroup({
      imagen_correcta: new FormControl('', Validators.required),
      imagen_incorrecta: new FormControl('', Validators.required),
      tiempo: new FormControl('', Validators.required)
    })

  }

  ngOnInit(): void {
  }

  jugar(): void {
    if (this.formJugar.valid){
    this.unsplashService.getPhotosApi(this.formJugar.controls['imagen_correcta'].value).subscribe(correct_data => {
      console.log(correct_data);
      this.unsplashService.getPhotosApi(this.formJugar.controls['imagen_incorrecta'].value).subscribe(incorrect_data => {
        console.log(incorrect_data);
        console.log(this.formJugar.controls['tiempo'].value);
        this.router.navigate(['/pantalla', JSON.stringify(correct_data), JSON.stringify(incorrect_data), this.formJugar.controls['tiempo'].value]);
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

}


