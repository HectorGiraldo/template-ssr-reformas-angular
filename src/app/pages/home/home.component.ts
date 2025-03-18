import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  items = [
    {
      titulo: ' Integrales',
      img: '/assets/img/Reformas-de-casas.jpg',
      descripcion:
        'Nuestro producto estrella, donde más valor aportamos y donde sacamos todo el potencial de tu vivienda para adecuarla a tus necesidades.',
    },
    {
      titulo: ' de Locales',
      img: '/assets/img/local.jpg',
      descripcion:
        'Si buscas lo mejor para tu negocio, esta es nuestra mejor propuesta. Calidad, diseño y velocidad de realización es lo que ofrecemos para ti y tus clientes.',
    },
    {
      titulo: ' de Casas',
      img: '/assets/img/background.jpg',
      descripcion:
        'Si tienes una casa con parcela y quieres que la reforma interior y exterior se integren consiguiendo la casa de tus sueños, Alto Nivel Reformas es tu mejor elección.',
    },
    {
      titulo: ' de Lujo',
      img: '/assets/img/Lujo.jpg',
      descripcion:
        '¿Te gustan los mejores materiales y los acabados de primerísima calidad? Este es tu sitio, aquí hacemos realidad todos tus deseos en una reforma de primera clase.',
    },

    {
      titulo: ' de Oficinas',
      img: '/assets/img/oficina.jpg',
      descripcion:
        'Si quieres trabajar en un entorno fantástico, con la mejor tecnología, con un aumento sustancial de la productividad y la felicidad de la plantilla, somos tu empresa de confianza.',
    },
    {
      titulo: ' de Pisos',
      img: '/assets/img/Pisos.jpg',
      descripcion:
        'Si necesitas sacar el máximo aprovechamiento de tu espacio y vivir en paz y tranquilidad en tu piso, cuenta con nosotros para darte lo mejor.',
    },
  ];
}
