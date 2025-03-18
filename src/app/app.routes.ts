import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/servicios/servicios.component').then(
        (m) => m.ServiciosComponent
      ),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(
        (m) => m.ContactoComponent
      ),
  },
  // {
  //   path: 'blog',
  //   loadComponent: () =>
  //     import('./pages/blog/blog.component').then((m) => m.BlogComponent),
  // },
  {
    path: 'aviso-legal',
    loadComponent: () =>
      import('./pages/aviso-legal/aviso-legal.component').then(
        (m) => m.AvisoLegalComponent
      ),
  },
  {
    path: 'politica-privacidad',
    loadComponent: () =>
      import('./pages/politica-privacidad/politica-privacidad.component').then(
        (m) => m.PoliticaPrivacidadComponent
      ),
  },
  {
    path: 'politica-cookies',
    loadComponent: () =>
      import('./pages/politica-cookies/politica-cookies.component').then(
        (m) => m.PoliticaCookiesComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
