# Sistema de Internacionalización (i18n)

## Descripción

El sitio web ahora soporta múltiples idiomas (Español e Inglés) usando un servicio de internacionalización personalizado.

## Características

- ✅ Soporte para español (es) e inglés (en)
- ✅ Detección automática de idioma del navegador
- ✅ Almacenamiento de preferencia en localStorage
- ✅ Cambio de idioma en tiempo real
- ✅ Pipe de traducción para usar en templates
- ✅ Observable reactivo para cambios de idioma

## Uso

### En TypeScript/Components

```typescript
import { I18nService } from '@app/core/services/i18n.service';

export class MyComponent {
  constructor(private i18n: I18nService) {}

  getSomeText() {
    const text = this.i18n.translate('hero.title');
  }

  changeLanguage(lang: 'es' | 'en') {
    this.i18n.setLanguage(lang);
  }

  getCurrentLanguage() {
    return this.i18n.getCurrentLanguage();
  }

  subscribeToLanguageChanges() {
    this.i18n.currentLanguage$.subscribe(lang => {
      console.log('Idioma cambió a:', lang);
    });
  }
}
```

### En Templates con la Pipe 't'

```html
<!-- Usar la pipe 't' para traducir claves -->
<h1>{{ 'hero.title' | t }}</h1>
<p>{{ 'hero.description' | t }}</p>
<button>{{ 'common.viewMore' | t }}</button>
```

### Componente Language Switcher

```html
<app-language-switcher></app-language-switcher>
```

Agrega este componente en tu header para permitir que los usuarios cambien de idioma.

## Estructura de Traducciones

Las traducciones están organizadas por módulos:

```
{
  header: {
    nav: { ... }
  },
  hero: { ... },
  about: { ... },
  experience: { ... },
  talks: { ... },
  communities: { ... },
  projects: { ... },
  skills: { ... },
  achievements: { ... },
  contact: { ... },
  common: { ... }
}
```

## Agregar Nuevas Traducciones

Para agregar nuevas traducciones, edita el objeto `translations` en `/src/app/core/services/i18n.service.ts`:

```typescript
const translations = {
  es: {
    // ... agregar aquí
    miNuevaSeccion: {
      titulo: "Mi título en español",
      descripcion: "Mi descripción en español"
    }
  },
  en: {
    // ... agregar aquí
    miNuevaSeccion: {
      titulo: "My title in English",
      descripcion: "My description in English"
    }
  }
};
```

Luego usa en tu componente:

```typescript
this.i18n.translate('miNuevaSeccion.titulo')
```

## Idiomas Soportados

- `es` - Español (por defecto)
- `en` - English

## Comportamiento de Fallback

- Si la clave de traducción no existe, retorna la clave misma
- Si el idioma no es válido, se usa español por defecto
- El idioma se detecta automáticamente del navegador

## localStorage

La preferencia de idioma se guarda en `localStorage` con la clave `'preferred-language'`

## Mejoras Futuras

- [ ] Agregar más idiomas (fr, pt, etc.)
- [ ] Sincronizar con Traductor de Google
- [ ] Agregar animaciones de transición
- [ ] SEO optimizado por idioma
