import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { Provider } from '@angular/core';

/**
 * Local images that also have a hand-generated 480px-wide "-sm" variant
 * on disk (see the home page cards). Anything not in this set falls
 * back to serving the requested src as-is, so a single ngSrc image
 * never 404s just because NgOptimizedImage asked for a width we don't
 * have a variant for.
 */
const HAS_SMALL_VARIANT = new Set([
  '/assets/img/Reformas-de-casas.jpg',
  '/assets/img/local.jpg',
  '/assets/img/background.jpg',
  '/assets/img/Lujo.jpg',
  '/assets/img/oficina.jpg',
  '/assets/img/Pisos.jpg',
]);

export function provideResponsiveImageLoader(): Provider {
  return {
    provide: IMAGE_LOADER,
    useValue: (config: ImageLoaderConfig) => {
      if (config.width === 480 && HAS_SMALL_VARIANT.has(config.src)) {
        return config.src.replace(/(\.\w+)$/, '-sm$1');
      }
      return config.src;
    },
  };
}
