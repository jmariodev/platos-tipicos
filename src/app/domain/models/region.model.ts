import { Departamento } from "./departamento.model";

export interface Region {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    color: string;
    departamentos: Departamento[];
}