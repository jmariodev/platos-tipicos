import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { Facebook, Twitter, Instagram, MapPin, ArrowRight, Search, ChevronDown, Filter, Mail, User, Clock, ChefHat, Users, Sparkles } from 'lucide-angular'
import { RegionRepository } from './domain/repositories/region.repository';
import { RegionRepositoryImpl } from './infrastructure/repositories/region.repository.imp';
import { PlatoRepository } from './domain/repositories/plato.repository';
import { PlatoRepositoryImpl } from './infrastructure/repositories/plato.repository.impl';
import { CategoriaRepository } from './domain/repositories/categoria.repository';
import { CategoriaRepositoryImpl } from './infrastructure/repositories/categoria.repository.imp';
  
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top'
    })),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Facebook,
        Twitter,
        Instagram,
        MapPin,
        ArrowRight,
        Search,
        ChevronDown,
        Filter,
        Mail,
        User,
        ArrowLeft,
        Clock,
        ChefHat,
        Users,
        Sparkles
      }),
    ),
    { provide: RegionRepository, useClass: RegionRepositoryImpl },
    { provide: PlatoRepository, useClass: PlatoRepositoryImpl },
    { provide: CategoriaRepository, useClass: CategoriaRepositoryImpl },
    
  ]
};
