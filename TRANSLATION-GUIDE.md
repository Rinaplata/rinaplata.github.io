# Guía Completa de Traducción - i18n

## Estado de Traducción por Componente

Este documento mapea todos los textos que necesitan ser traducidos en cada componente.

### ✅ COMPLETADOS

#### Header (core/layout/header.component.ts)
- ✅ Navegación principal (home, about, experience, talks, communities, projects, contact)
- ✅ Language Switcher integrado
- ✅ Theme toggle

#### Talks (features/talks/)
- ✅ Talks Gallery - Títulos, descripciones, botones
- ✅ All Talks Page - Filtros, tipos de charlas
- ✅ Badges de tipo (speaker, panel, entrevista, hackathon)

### 📋 POR HACER

#### Hero (features/home/hero.component.ts)
Necesita traducir:
```typescript
// En el template:
- eyebrow: "Frontend · Accesibilidad · Comunidad · Identidad Wayuu"
- h1: profile.name
- p.hero__role: profile.role
- p.hero__description: [descripción]
- botones: "Ver proyectos", "Ver charlas", "Contactarme"
- aria-labels
```

**Claves i18n a usar:**
- `hero.eyebrow`
- `hero.role`
- `hero.description`
- `hero.cta.projects`
- `hero.cta.talks`
- `hero.cta.contact`

#### About (features/about/about.component.ts)
**Claves i18n a usar:**
- `about.eyebrow`
- `about.title`

#### Experience (features/experience/experience-timeline.component.ts)
**Claves i18n a usar:**
- `experience.eyebrow`
- `experience.title`

#### Communities (features/communities/communities.component.ts)
**Claves i18n a usar:**
- `communities.eyebrow`
- `communities.title`

#### Projects (features/projects/projects-grid.component.ts)
**Claves i18n a usar:**
- `projects.eyebrow`
- `projects.title`
- `projects.description`

#### Skills (features/skills/skills.component.ts)
**Claves i18n a usar:**
- `skills.eyebrow`
- `skills.title`

#### Achievements (features/achievements/achievements.component.ts)
**Claves i18n a usar:**
- `achievements.eyebrow`
- `achievements.title`

#### Contact (features/contact/contact.component.ts)
**Claves i18n a usar:**
- `contact.eyebrow`
- `contact.title`
- `contact.description`
- `contact.email`
- `contact.sendMessage`
- `contact.openLink`
- `contact.cv`
- `contact.downloadPDF`
- `contact.newTab`

#### Section Heading (shared/components/section-heading.component.ts)
Este componente recibe los títulos dinámicamente, así que está lista cuando se usen con la pipe `| t`

### 🔧 IMPLEMENTACIÓN

#### Paso 1: Usar el servicio i18n en cada componente

```typescript
import { I18nService } from '../../core/services/i18n.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  imports: [TranslatePipe, ...],
  template: `
    <!-- Opción 1: Usar la pipe en templates -->
    <h1>{{ 'hero.title' | t }}</h1>
    
    <!-- Opción 2: Usar el servicio en componentes -->
    <p>{{ i18n.translate('hero.description') }}</p>
  `
})
export class MiComponente {
  constructor(readonly i18n: I18nService) {}
}
```

#### Paso 2: Actualizar traducciones en i18n.service.ts

Agregar las nuevas claves en el objeto `translations`:

```typescript
es: {
  hero: {
    eyebrow: "...",
    title: "...",
    description: "..."
  }
}
```

### 📱 Componente Language Selector

Crear una página o modal con:
```
[🇪🇸 Español] [🇺🇸 English]
```

Localización: Puede ir en:
- Header (ya está implementado)
- Footer
- Modal/Página dedicada

### 📝 Convenciones de Claves

Las claves siguen este patrón:
```
section.subsection.key

Ejemplos:
- hero.eyebrow
- hero.cta.projects
- talks.filters.all
- contact.email
```

### ✨ Beneficios

- Mantenimiento centralizado de traducciones
- Fácil agregar nuevos idiomas
- Detección automática del idioma del navegador
- Persistencia en localStorage
- Reactividad con Observables (currentLanguage$)

