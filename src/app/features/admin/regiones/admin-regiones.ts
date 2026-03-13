import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { RegionRepository } from '../../../domain/repositories/region.repository';
import { Region } from '../../../domain/models/region.model';

@Component({
    selector: 'app-admin-regiones',
    imports: [FormsModule, LucideAngularModule],
    templateUrl: './admin-regiones.html',
    styleUrl: './admin-regiones.css',
})
export class AdminRegiones {
    private regionRepo = inject(RegionRepository);

    regiones = toSignal(this.regionRepo.getRegiones(), { initialValue: [] });

    // Nueva región
    nuevaRegion = signal({ nombre: '', descripcion: '', imagen: '', color: '' });

    // Edición de región
    editandoRegionId = signal<number | null>(null);
    editandoRegion = signal({ nombre: '', descripcion: '', imagen: '', color: '' });

    // Nuevo departamento
    nuevoDepartamento = signal<{ [regionId: number]: string }>({});

    // Expandir región
    expandedRegionId = signal<number | null>(null);

    toggleExpand(regionId: number) {
        this.expandedRegionId.update(id => id === regionId ? null : regionId);
    }

    agregarRegion() {
        const r = this.nuevaRegion();
        if (!r.nombre.trim()) return;
        this.regionRepo.addRegion({
            id: 0,
            nombre: r.nombre.trim(),
            descripcion: r.descripcion.trim(),
            imagen: r.imagen.trim(),
            color: r.color.trim() || 'from-gray-400/80 to-gray-600/80',
            departamentos: [],
        }).subscribe();
        this.nuevaRegion.set({ nombre: '', descripcion: '', imagen: '', color: '' });
    }

    iniciarEdicionRegion(region: Region) {
        this.editandoRegionId.set(region.id);
        this.editandoRegion.set({
            nombre: region.nombre,
            descripcion: region.descripcion,
            imagen: region.imagen,
            color: region.color,
        });
    }

    cancelarEdicionRegion() {
        this.editandoRegionId.set(null);
    }

    guardarEdicionRegion(region: Region) {
        const r = this.editandoRegion();
        if (!r.nombre.trim()) return;
        this.regionRepo.updateRegion({
            ...region,
            nombre: r.nombre.trim(),
            descripcion: r.descripcion.trim(),
            imagen: r.imagen.trim(),
            color: r.color.trim(),
        }).subscribe();
        this.cancelarEdicionRegion();
    }

    eliminarRegion(id: number) {
        if (confirm('¿Estás seguro de eliminar esta región y todos sus departamentos?')) {
            this.regionRepo.deleteRegion(id).subscribe();
        }
    }

    agregarDepartamento(regionId: number) {
        const nombre = (this.nuevoDepartamento()[regionId] || '').trim();
        if (!nombre) return;
        this.regionRepo.addDepartamento(regionId, { id: 0, nombre }).subscribe();
        this.nuevoDepartamento.update(d => ({ ...d, [regionId]: '' }));
    }

    eliminarDepartamento(regionId: number, departamentoId: number) {
        if (confirm('¿Eliminar este departamento?')) {
            this.regionRepo.deleteDepartamento(regionId, departamentoId).subscribe();
        }
    }

    updateNuevoDep(regionId: number, value: string) {
        this.nuevoDepartamento.update(d => ({ ...d, [regionId]: value }));
    }

    getNuevoDep(regionId: number): string {
        return this.nuevoDepartamento()[regionId] || '';
    }

    updateNuevaRegion(field: string, value: string) {
        this.nuevaRegion.update(r => ({ ...r, [field]: value }));
    }

    updateEditandoRegion(field: string, value: string) {
        this.editandoRegion.update(r => ({ ...r, [field]: value }));
    }
}
