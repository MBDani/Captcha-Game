import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-errores-formulario',
  templateUrl: './errores-formulario.component.html',
  styleUrls: ['./errores-formulario.component.scss']
})
export class ErroresFormularioComponent implements OnInit, OnChanges {
  @Input()elemento: string | null = ''

  mensajesErrores: Array<string> = []

  constructor() { }
  
  ngOnInit(): void {

  }
  
  ngOnChanges(): void {
    this.mensajesErrores = []
    if (this.elemento != ''){
      const mensajeError = `*Obligatorio rellenar el campo "${this.elemento}"`
      this.mensajesErrores.push(mensajeError)
    }
  }
  
}
