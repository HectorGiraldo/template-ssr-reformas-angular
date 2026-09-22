import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sets a page-specific title and description', () => {
    service.update(
      { title: 'Contacto', description: 'Solicita presupuesto sin compromiso.' },
      '/contacto'
    );

    expect(title.getTitle()).toBe('Contacto | Hecmar Reformas');
    expect(meta.getTag('name="description"')?.content).toBe(
      'Solicita presupuesto sin compromiso.'
    );
    expect(meta.getTag('property="og:url"')?.content).toBe(
      'https://www.hecmarreformas.es/contacto'
    );
  });
});
