import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { LucideAngularModule } from 'lucide-angular';
import {
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
  Clock,
  ChefHat,
  Users,
  Sparkles,
  ArrowLeft,
  LayoutDashboard,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Tag,
  Menu,
  Lock,
} from 'lucide-angular';
import { RegionRepository } from './domain/repositories/region.repository';
import { RegionRepositoryImpl } from './infrastructure/repositories/region.repository.imp';
import { PlatoRepository } from './domain/repositories/plato.repository';
import { PlatoRepositoryImpl } from './infrastructure/repositories/plato.repository.impl';
import { CategoriaRepository } from './domain/repositories/categoria.repository';
import { CategoriaRepositoryImpl } from './infrastructure/repositories/categoria.repository.imp';
import { DepartamentoRepository } from './domain/repositories/departamento.repository';
import { DepartamentoRepositoryImpl } from './infrastructure/repositories/departamento.repository.imp';
import { UsuarioRepository } from './domain/repositories/usuario.repository';
import { UsuarioRepositoryImpl } from './infrastructure/repositories/usuario.repository.imp';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/repositories/auth.repository.imp';
import { ComentarioRepository } from './domain/repositories/comentario.repository';
import { ComentariosRepositoryImp } from './infrastructure/repositories/comentarios.repository.imp';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top',
      }),
    ),
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
        Sparkles,
        LayoutDashboard,
        Plus,
        Pencil,
        Trash2,
        Save,
        X,
        Tag,
        Menu,
        Lock,
      }),
    ),
    { provide: RegionRepository, useClass: RegionRepositoryImpl },
    { provide: PlatoRepository, useClass: PlatoRepositoryImpl },
    { provide: CategoriaRepository, useClass: CategoriaRepositoryImpl },
    { provide: DepartamentoRepository, useClass: DepartamentoRepositoryImpl },
    { provide: UsuarioRepository, useClass: UsuarioRepositoryImpl },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: ComentarioRepository, useClass: ComentariosRepositoryImp },
  ],
};
