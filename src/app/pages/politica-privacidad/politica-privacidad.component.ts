import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-politica-privacidad',
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update(
      {
        title: 'Política de privacidad',
        description: 'Cómo Hecmar Reformas S.L. trata y protege tus datos personales.',
      },
      '/politica-privacidad'
    );
  }
}
