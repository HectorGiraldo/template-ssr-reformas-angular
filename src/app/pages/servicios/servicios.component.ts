import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-servicios',
  imports: [RouterModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update(
      {
        title: 'Servicios de reformas integrales',
        description:
          'Reformas integrales en Madrid para particulares y empresas: diseño, materiales de calidad y ejecución con garantía en cada proyecto.',
      },
      '/servicios'
    );
  }
}
