import { Component, inject } from '@angular/core';
import { Region } from '../../../domain/models/region.model';
import { RegionRepository } from '../../../domain/repositories/region.repository';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private regionRepository = inject(RegionRepository);

  regiones = toSignal(
    this.regionRepository.getRegiones(),
    { initialValue: [] as Region[] }
  );
}
