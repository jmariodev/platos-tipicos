import { Component, inject, signal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { PlatoRepository } from '../../../domain/repositories/plato.repository';
import { CategoriaRepository } from '../../../domain/repositories/categoria.repository';
import { RegionRepository } from '../../../domain/repositories/region.repository';
import { Plato } from '../../../domain/models/plato.model';
import { Region } from '../../../domain/models/region.model';

@Component({
    selector: 'app-admin-plato-form',
    imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
    templateUrl: './admin-plato-form.html',
    styleUrl: './admin-plato-form.css',
})
export class AdminPlatoForm implements OnInit {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private platoRepo = inject(PlatoRepository);
    private categoriaRepo = inject(CategoriaRepository);
    private regionRepo = inject(RegionRepository);

    categorias = toSignal(this.categoriaRepo.getCategorias(), { initialValue: [] });
    regiones = toSignal(this.regionRepo.getRegiones(), { initialValue: [] });

    isEditing = signal(false);
    platoId = signal<number | null>(null);
    selectedRegion = signal<Region | null>(null);

    form: FormGroup = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        descripcion: ['', [Validators.required]],
        historia: [''],
        datoCurioso: [''],
        porciones: [1, [Validators.required, Validators.min(1)]],
        tiempoPreparacion: [30, [Validators.required, Validators.min(1)]],
        popularidad: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
        esDestacado: [false],
        categoriaId: [null, [Validators.required]],
        regionId: [null, [Validators.required]],
        departamentoId: [null, [Validators.required]],
        ingredientes: this.fb.array([]),
        galeria: this.fb.array([]),
    });

    get ingredientes(): FormArray {
        return this.form.get('ingredientes') as FormArray;
    }

    get galeria(): FormArray {
        return this.form.get('galeria') as FormArray;
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id && id !== 'crear') {
            this.isEditing.set(true);
            this.platoId.set(Number(id));
            this.platoRepo.getPlatoById(Number(id)).subscribe(plato => {
                if (plato) {
                    this.loadPlato(plato);
                }
            });
        } else {
            this.agregarIngrediente();
        }
    }

    private loadPlato(plato: Plato) {
        // Find region for this departamento
        const regiones = this.regiones();
        const region = regiones.find(r =>
            r.departamentos.some(d => d.id === plato.departamento.id)
        );
        if (region) {
            this.selectedRegion.set(region);
        }

        this.form.patchValue({
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            historia: plato.historia,
            datoCurioso: plato.datoCurioso,
            porciones: plato.porciones,
            tiempoPreparacion: plato.tiempoPreparacion,
            popularidad: plato.popularidad,
            esDestacado: plato.esDestacado,
            categoriaId: plato.categoria.id,
            regionId: region?.id ?? null,
            departamentoId: plato.departamento.id,
        });

        // Load ingredientes
        this.ingredientes.clear();
        plato.ingredientes.forEach(ing => {
            this.ingredientes.push(this.fb.group({
                nombre: [ing.nombre, Validators.required],
                cantidad: [ing.cantidad],
                tipo: [ing.tipo],
            }));
        });

        // Load galeria
        this.galeria.clear();
        plato.galeria.forEach(img => {
            this.galeria.push(this.fb.group({
                url: [img.url, Validators.required],
                tipo: [img.tipo],
                descripcion: [img.descripcion],
            }));
        });
    }

    agregarIngrediente() {
        this.ingredientes.push(this.fb.group({
            nombre: ['', Validators.required],
            cantidad: [''],
            tipo: ['principal'],
        }));
    }

    eliminarIngrediente(index: number) {
        this.ingredientes.removeAt(index);
    }

    agregarImagen() {
        this.galeria.push(this.fb.group({
            url: ['', Validators.required],
            tipo: ['principal'],
            descripcion: [''],
        }));
    }

    eliminarImagen(index: number) {
        this.galeria.removeAt(index);
    }

    onRegionChange(event: Event) {
        const regionId = Number((event.target as HTMLSelectElement).value);
        const region = this.regiones().find(r => r.id === regionId) ?? null;
        this.selectedRegion.set(region);
        this.form.patchValue({ departamentoId: null });
    }

    guardar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const val = this.form.value;
        const categoria = this.categorias().find(c => c.id === Number(val.categoriaId));
        const region = this.selectedRegion();
        const departamento = region?.departamentos.find(d => d.id === Number(val.departamentoId));

        if (!categoria || !departamento) return;

        const plato: Plato = {
            id: this.platoId() ?? 0,
            nombre: val.nombre,
            descripcion: val.descripcion,
            historia: val.historia || '',
            datoCurioso: val.datoCurioso || '',
            porciones: val.porciones,
            tiempoPreparacion: val.tiempoPreparacion,
            popularidad: val.popularidad,
            esDestacado: val.esDestacado,
            categoria,
            departamento,
            ingredientes: val.ingredientes.map((ing: any, i: number) => ({
                id: i + 1,
                nombre: ing.nombre,
                cantidad: ing.cantidad || '',
                tipo: ing.tipo || 'principal',
            })),
            galeria: val.galeria.map((img: any, i: number) => ({
                id: i + 1,
                url: img.url,
                tipo: img.tipo || 'principal',
                descripcion: img.descripcion || '',
            })),
            comentarios: [],
        };

        if (this.isEditing()) {
            this.platoRepo.updatePlato(plato);
        } else {
            this.platoRepo.addPlato(plato);
        }

        this.router.navigate(['/admin/platos']);
    }
}
