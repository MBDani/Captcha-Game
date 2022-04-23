import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsplashService } from '../servicios/unsplash.service';
import { IFoto } from './models/fotos.models';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.scss']
})
export class PantallaComponent implements OnInit {

  fotos_correctas: IFoto[] = [];
  fotos_incorrectas: IFoto[] = [];
  fotos_mezcladas: IFoto[] = [];

  palabra_correcta: string = '';
  palabra_incorrecta: string = '';

  contadorIDs: number = 0;

  tiempoRestante: number = 999;

  juegoTerminado: boolean = false;

  mockFotosCorrectas: any =
    [
      {
        "url": "https://images.unsplash.com/photo-1600272008408-6e05d5aa3e7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwxfHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 0,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1586554664514-8f75dbd6fb62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwyfHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 1,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1608032364895-0da67af36cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwzfHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 2,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1596921825946-d738194fac80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw0fHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 3,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1606715895281-ccdf0143f198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw1fHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 4,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1516139008210-96e45dccd83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw2fHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 5,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1619912947529-b52b11ed92a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw3fHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 6,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw4fHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 7,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1604430352727-c0555f882e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw5fHxnYXRvfGVufDB8fHx8MTY1MDY0MzY3Nw&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 8,
        "marcada": false
      },
      {
        "url": "https://images.unsplash.com/photo-1562986839-a4479379aca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwxMHx8Z2F0b3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
        "palabra": "gato",
        "id": 9,
        "marcada": false
      }
    ]

  mockFotosIncorrectas: any = [
    {
      "url": "https://images.unsplash.com/photo-1594076452498-4bea36e8e7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwxfHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 10,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1505628346881-b72b27e84530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwyfHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 11,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1620661795050-e67d9bd258de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwzfHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 12,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1608335890650-e6d0a2a691b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw0fHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 13,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1591601523038-edc3dc8f20a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw1fHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 14,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1504595403659-9088ce801e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw2fHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 15,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1552915212-139b695d4a2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw3fHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 16,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1584453147785-df3e8fbcf048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw4fHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 17,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1507660392550-9aff6e04c7e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHw5fHxwZXJyb3xlbnwwfHx8fDE2NTA2NDM2Nzc&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 18,
      "marcada": false
    },
    {
      "url": "https://images.unsplash.com/photo-1554585169-7874e5492962?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjA5NDN8MHwxfHNlYXJjaHwxMHx8cGVycm98ZW58MHx8fHwxNjUwNjQzNjc3&ixlib=rb-1.2.1&q=80&w=400",
      "palabra": "perro",
      "id": 19,
      "marcada": false
    }
  ]

  constructor(private unsPlashService: UnsplashService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // this.obtenerDatosExternos();
    this.mockearFotos();

    console.log(this.fotos_correctas);
    console.log(this.fotos_incorrectas);

    this.mezclarFotos();
    this.inicializarContador();
  }

  mockearFotos() {
    this.fotos_correctas = this.mockFotosCorrectas;
    this.fotos_incorrectas = this.mockFotosIncorrectas;

    this.palabra_correcta = "gato";
    this.palabra_incorrecta = "perro";
  }

  obtenerDatosExternos() {
    const correct_data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('correct_data') || '{}');
    const incorrect_data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('incorrect_data') || '{}');

    const tiempo = this.activatedRoute.snapshot.params['tiempo'];
    this.tiempoRestante = Number(tiempo);

    this.palabra_correcta = correct_data.meta.keyword;
    this.palabra_incorrecta = incorrect_data.meta.keyword;

    this.fotos_correctas = this.obtenerFotos(correct_data, this.palabra_correcta);
    this.fotos_incorrectas = this.obtenerFotos(incorrect_data, this.palabra_incorrecta);
  }


  obtenerFotos(data: any, palabra: string): IFoto[] {
    let fotos: IFoto[] = [];
    data.photos.results.forEach((element: { urls: { small: string; }; }): void => {
      fotos.push({ url: element.urls.small, palabra: palabra, id: this.contadorIDs, marcada: false });
      this.contadorIDs++;
    });
    return fotos;
  }

  mezclarFotos() {
    this.fotos_mezcladas = this.fotos_correctas.concat(this.fotos_incorrectas);
    this.fotos_mezcladas.sort(() => Math.random() - 0.5);
    console.log(this.fotos_mezcladas)
  }

  photoClicked(foto: IFoto): void {
    foto.marcada = !foto.marcada;
  }



  darResultado(): void {
    if (this.juegoTerminado !== true) {
      this.juegoTerminado = true;

      const acertados = this.fotos_correctas.filter((foto: IFoto) => foto.marcada == true).length;

      Swal.fire({
        title: `<strong>${this.palabra_correcta}</strong>`,
        html: `¡Has acertado <b> ${acertados}/${this.fotos_correctas.length}</b>!`,
        imageUrl: this.fotos_correctas[0].url,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: this.palabra_correcta,
        showCloseButton: true,
        confirmButtonText: 'Volver al menú principal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/menu-principal'])
        }
      })
    }
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
}


