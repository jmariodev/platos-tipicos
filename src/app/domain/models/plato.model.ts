import { Categoria } from './categoria.model';
import { Comentarios } from './comentarios.model';
import { Departamento } from './departamento.model';
import { Galeria } from './galeria.model';
import { Ingrediente } from './ingrediente.model';
import { Region } from './region.model';
import { Usuario } from './usuario.model';

export interface Plato {
  id: number;
  nombre: string;
  porciones: number;
  destacado: boolean;
  tiempoPreparacion: number;
  datoCurioso: string;
  historia: string;
  descripcion: string;
  popularidad: number;
  departamento: Departamento;
  categoria: Categoria;
  ingredientes: Ingrediente[];
  galeria: Galeria[];
  region?: Region;
  comentarios?: Comentarios[];
  usuario?: Usuario;
}
