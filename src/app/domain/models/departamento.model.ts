import { Region } from './region.model';

export interface Departamento {
  id: number;
  nombre: string;
  regionId?: number;
  region?: Region;
}
