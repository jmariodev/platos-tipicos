import { Component, inject, signal, OnInit, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { PlatoRepository } from '../../../../../domain/repositories/plato.repository';
import { CategoriaRepository } from '../../../../../domain/repositories/categoria.repository';
import { RegionRepository } from '../../../../../domain/repositories/region.repository';
import { DepartamentoRepository } from '../../../../../domain/repositories/departamento.repository';
import { Plato } from '../../../../../domain/models/plato.model';
import { Region } from '../../../../../domain/models/region.model';
import { Departamento } from '../../../../../domain/models/departamento.model';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { SessionState } from '../../../../../core/state/session.state';

@Component({
  selector: 'app-save-modify-plato',
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './save-modify-plato.html',
  styleUrl: './save-modify-plato.css',
})
export class SaveModifyPlato implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platoRepo = inject(PlatoRepository);
  private categoriaRepository = inject(CategoriaRepository);
  private regionRepository = inject(RegionRepository);
  private departamentoRepository = inject(DepartamentoRepository);
  private sessionState = inject(SessionState);

  categorias = toSignal(this.categoriaRepository.getCategorias(), { initialValue: [] });
  regiones = toSignal(this.regionRepository.getRegiones(), { initialValue: [] });
  departamentos = signal<Departamento[]>([]);

  isEditing = signal(false);
  platoId = signal<number>(0);
  selectedRegion = signal<Region | null>(null);

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required]],
    historia: [''],
    datoCurioso: [''],
    porciones: [1, [Validators.required, Validators.min(1)]],
    tiempoPreparacion: [30, [Validators.required, Validators.min(1)]],
    destacado: [false],
    categoria: [null, [Validators.required]],
    regionId: [null, [Validators.required]],
    departamento: [null, [Validators.required]],
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
    const id = this.route.snapshot.params['id'];
    this.platoId.set(Number(id) || 0);
  }

  platoResource = resource({
    params: () => this.platoId(),
    loader: async ({ params }) => {
      if (!params) return;
      if (params === 0) return;
      const plato = await firstValueFrom(this.platoRepo.getPlatoById(Number(params)));
      if (!plato) return;
      this.isEditing.set(true);
      this.form.patchValue(plato);
      this.form.get('regionId')?.setValue(plato.departamento.regionId);
      this.selectedRegion.set(
        this.regiones().find((r) => r.id === plato.departamento.regionId) ?? null,
      );

      this.departamentos.set(
        await firstValueFrom(
          this.departamentoRepository.getDepartamentosByRegionId(this.selectedRegion()!.id),
        ),
      );
      this.cargarGaleria(plato.galeria);
      return plato;
    },
  });

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  private loadPlato(plato: Plato) {
    // Find region for this departamento
    const regiones = this.regiones();
    const region = regiones.find((r) =>
      r.departamentos.some((d) => d.id === plato.departamento.id),
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
      destacado: plato.destacado,
      categoriaId: plato.categoria.id,
      regionId: region?.id ?? null,
      departamentoId: plato.departamento.id,
      ingredientes: plato.ingredientes,
      galeria: plato.galeria,
      comentarios: plato.comentarios, // para que no se pierdan los comentarios
    });

    /* // Load ingredientes
    this.ingredientes.clear();
    plato.ingredientes.forEach((ing) => {
      this.ingredientes.push(
        this.fb.group({
          nombre: [ing.nombre, Validators.required],
          cantidad: [ing.cantidad],
          tipo: [ing.tipo],
        }),
      );
    });

    // Load galeria
    this.galeria.clear();
    plato.galeria.forEach((img) => {
      this.galeria.push(
        this.fb.group({
          url: [img.url, Validators.required],
          esPrincipal: [img.esPrincipal],
        }),
      );
    }); */
  }

  agregarIngrediente() {
    this.ingredientes.push(
      this.fb.group({
        nombre: ['', Validators.required],
        cantidad: [''],
        tipo: ['principal'],
      }),
    );
  }

  eliminarIngrediente(index: number) {
    this.ingredientes.removeAt(index);
  }

  agregarImagen() {
    this.galeria.push(
      this.fb.group({
        id: null,
        url: ['', Validators.required],
        esPrincipal: [false],
      }),
    );
  }

  cargarGaleria(galeria: any[]) {
    this.galeria.clear();

    galeria.forEach((img) => {
      this.galeria.push(
        this.fb.group({
          id: [img.id],
          url: [img.url],
          esPrincipal: [img.esPrincipal],
        }),
      );
    });
  }

  eliminarImagen(index: number) {
    this.galeria.removeAt(index);
  }

  async onRegionChange(event: Event) {
    const regionId = Number((event.target as HTMLSelectElement).value);
    const region = this.regiones().find((r) => r.id === regionId) ?? null;
    this.selectedRegion.set(region);
    this.departamentos.set(
      await firstValueFrom(this.departamentoRepository.getDepartamentosByRegionId(regionId)),
    );
    this.form.patchValue({ departamento: null });
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;

    if (!val.categoria || !val.departamento) return;
    delete val.departamento.regionId;
    const plato: Plato = {
      id: this.platoId() ?? undefined,
      nombre: val.nombre,
      descripcion: val.descripcion,
      historia: val.historia || '',
      datoCurioso: val.datoCurioso || '',
      porciones: val.porciones,
      tiempoPreparacion: Number(val.tiempoPreparacion),
      popularidad: val.popularidad,
      destacado: val.destacado,
      categoria: val.categoria,
      departamento: val.departamento,
      ingredientes: val.ingredientes,
      galeria: val.galeria,
      usuario: this.sessionState.usuario()!,
    };

    if (this.isEditing()) {
      const platoActualizado = await lastValueFrom(this.platoRepo.updatePlato(plato));

      if (!platoActualizado || platoActualizado.id == null) {
        alert('Error al actualizar el plato');
        return;
      }

      this.router.navigate(['/admin/platos']);
      return;
    }

    const platoCreado = await firstValueFrom(this.platoRepo.addPlato(plato));
    if (!platoCreado || platoCreado.id == null) {
      alert('Error al crear el plato');
      return;
    }
    this.router.navigate(['/admin/platos']);
    return;
  }
}
