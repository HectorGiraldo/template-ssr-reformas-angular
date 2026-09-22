import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-aviso-legal',
  imports: [],
  templateUrl: './aviso-legal.component.html',
  styleUrl: './aviso-legal.component.css'
})
export class AvisoLegalComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update(
      {
        title: 'Aviso legal',
        description: 'Información legal de Hecmar Reformas S.L., empresa de reformas integrales en Madrid.',
      },
      '/aviso-legal'
    );
  }
}
