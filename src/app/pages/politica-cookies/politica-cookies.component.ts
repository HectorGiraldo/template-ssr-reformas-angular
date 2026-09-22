import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-politica-cookies',
  imports: [],
  templateUrl: './politica-cookies.component.html',
  styleUrl: './politica-cookies.component.css'
})
export class PoliticaCookiesComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update(
      {
        title: 'Política de cookies',
        description: 'Información sobre el uso de cookies en el sitio web de Hecmar Reformas.',
      },
      '/politica-cookies'
    );
  }
}
