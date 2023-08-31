import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsplashService } from '../servicios/unsplash.service';
import { IFoto } from './models/fotos.models';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.scss'],
})
export class PantallaComponent implements OnInit, OnDestroy {
  fotos_correctas: IFoto[] = [];
  fotos_incorrectas: IFoto[] = [];
  fotos_mezcladas: IFoto[] = [];

  palabra_correcta: string = '';
  palabra_incorrecta: string = '';

  contadorIDs: number = 0;

  tiempo: number = 0;
  tiempoRestante: number = 999;

  juegoTerminado: boolean = false;

  puntosMaximos: number = 0;
  puntosARestar: number = 0;

  puntos: number = 0;
  aciertos: number = 0;
  errores: number = 0;

  constructor(
    private unsplashService: UnsplashService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerDatosExternos();
    this.inicializarContador();
  }

  obtenerDatosExternos() {
    this.tiempo = Number(this.activatedRoute.snapshot.params['tiempo']);
    this.palabra_correcta =
      this.activatedRoute.snapshot.params['palabra_correcta'];
    this.palabra_incorrecta =
      this.activatedRoute.snapshot.params['palabra_incorrecta'];
    this.tiempoRestante = this.tiempo;

    this.unsplashService
      .getPhotosApi(this.palabra_correcta)
      .subscribe((correct_data) => {
        this.fotos_correctas = this.obtenerFotos(
          correct_data,
          this.palabra_correcta
        );
        this.unsplashService
          .getPhotosApi(this.palabra_incorrecta)
          .subscribe((incorrect_data) => {
            this.fotos_incorrectas = this.obtenerFotos(
              incorrect_data,
              this.palabra_incorrecta
            );
            this.mezclarFotos();
          });
      });
  }

  obtenerFotos(data: any, palabra: string): IFoto[] {
    let fotos: IFoto[] = [];
    data.results.forEach((element: { urls: { small: string } }): void => {
      fotos.push({
        url: element.urls.small,
        palabra: palabra,
        id: this.contadorIDs,
        marcada: false,
      });
      this.contadorIDs++;
    });
    return fotos;
  }

  mezclarFotos() {
    this.fotos_mezcladas = this.fotos_correctas.concat(this.fotos_incorrectas);
    this.fotos_mezcladas.sort(() => Math.random() - 0.5);
    console.log(this.fotos_mezcladas);
  }

  photoClicked(foto: IFoto): void {
    foto.marcada = !foto.marcada;
  }

  darResultado(): void {
    if (this.juegoTerminado !== true) {
      this.juegoTerminado = true;
      this.aciertos = this.fotos_correctas.filter(
        (foto: IFoto) => foto.marcada == true
      ).length;
      this.errores = this.fotos_incorrectas.filter(
        (foto: IFoto) => foto.marcada == true
      ).length;
      this.puntos = this.calcularPuntosFinales(this.aciertos);

      this.popUpResultado();
    }
  }

  popUpResultado() {
    Swal.fire({
      title: `<h1>¡Has conseguido ${this.puntos}/${this.puntosMaximos}</h1><strong>${this.palabra_correcta}</strong>`,
      html: `¡Has acertado <b> ${this.aciertos}/${(this.fotos_correctas.length / 2)}</b>!<br>
      ¡Has fallado <b> ${this.errores}/${(this.fotos_incorrectas.length / 2)}</b>!`,
      imageUrl: this.fotos_correctas[0].url,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: this.palabra_correcta,
      showCloseButton: true,
      confirmButtonText: 'Volver al menú principal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/menu-principal']);
      }
    });
  }

  calcularPuntosFinales(aciertos: number): number {
    switch (this.tiempo) {
      case 10:
        this.puntosMaximos = 1000;
        this.puntosARestar = 100;
        break;
      case 20:
        this.puntosMaximos = 800;
        this.puntosARestar = 80;
        break;
      case 30:
        this.puntosMaximos = 600;
        this.puntosARestar = 60;
        break;
      case 40:
        this.puntosMaximos = 400;
        this.puntosARestar = 40;
        break;
      case 50:
        this.puntosMaximos = 200;
        this.puntosARestar = 20;
        break;
      case 60:
        this.puntosMaximos = 100;
        this.puntosARestar = 10;
        break;
    }

    this.puntosARestar *= this.errores;
    return (this.puntosMaximos * aciertos) / 10 - this.puntosARestar;
  }

  inicializarContador() {
    const source = timer(this.tiempoRestante, 1000);
    const subscriptionTimer = source.subscribe(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante == 0 || this.juegoTerminado == true) {
        subscriptionTimer.unsubscribe();
        this.darResultado();
        this.tiempoRestante -= this.tiempoRestante;
      }
    });
  }

  ngOnDestroy(): void {
    this.juegoTerminado = true;
  }
}
