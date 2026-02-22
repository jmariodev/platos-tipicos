import { Categoria } from "./categoria.model";
import { Comentarios } from "./comentarios.model";
import { Departamento } from "./departamento.model";
import { Galeria } from "./galeria.model";
import { Ingrediente } from "./ingrediente.model";

export interface Plato {
    id: string;
    nombre: string;
    porciones: number;
    esDestacado: boolean;
    tiempoPreparacion: number;
    datoCurioso: string;
    historia: string;
    descripcion: string;
    popularidad: number;
    departamento: Departamento;
    categoria: Categoria;
    ingredientes: Ingrediente[];
    galeria: Galeria[];
    comentarios: Comentarios[];
}