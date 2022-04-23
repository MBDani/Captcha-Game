import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-errores-formulario',
  templateUrl: './errores-formulario.component.html',
  styleUrls: ['./errores-formulario.component.scss']
})
export class ErroresFormularioComponent implements OnInit, OnChanges {
  // @Input()errores: ValidationErrors | null = {}
  @Input()elemento: string | null = ''

  mensajesErrores: Array<string> = []

  constructor() { }
  
  ngOnInit(): void {

  }
  
  ngOnChanges(): void {
    this.mensajesErrores = []
    if (this.elemento != ''){
      // const mensajeError = this.elemento == 'email' ? 'El email no es válido' : 'La URL no es válida'
      const mensajeError = `*Obligatorio rellenar el campo "${this.elemento}"`
      this.mensajesErrores.push(mensajeError)
    // }else{
    //   for (let key in this.errores) {
    //     console.log(key)
    //     const error = this.errores[key]
  
    //     if (key == 'required') {
    //       this.mensajesErrores.push('El campo es obligatorio')
  
    //     } else if (key == 'minlength') {
    //       const msg = `Te faltan ${error.requiredLength - error.actualLength}/${error.requiredLength} caracteres`
    //       this.mensajesErrores.push(msg)
  
    //     } else if (key == 'pattern') {
    //       const msg = `El ${error.actualValue} no cumple con el siguiente patrón: ${error.requiredPattern}`
    //       this.mensajesErrores.push(msg)
  
    //     } else if (key == 'esStark') {
    //       const msg = `${error.nombreActual} no es un Stark (${error.nombresValidos.join(', ')})`
    //       this.mensajesErrores.push(msg)
  
    //     } else if (key == 'esPwSegura') {
    //       if (!error.simbolos) {
    //         this.mensajesErrores.push('La contraseña tiene que tener algún signo de puntuación')
    //       } 
    //       if (!error.mayus) {
    //         this.mensajesErrores.push('La contraseña tiene que tener alguna letra en mayúsculas')
    //       }
          
    //     }else if (key == 'confirmarPassword') {
    //       this.mensajesErrores.push('Las contraseñas tienen que ser iguales')
    //     }
    //   }
    }
  }
  
}
