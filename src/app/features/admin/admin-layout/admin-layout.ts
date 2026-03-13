import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-admin-layout',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
    templateUrl: './admin-layout.html',
    styleUrl: './admin-layout.css',
})
export class AdminLayout {
    sidebarOpen = signal(true);

    toggleSidebar() {
        this.sidebarOpen.update(v => !v);
    }
}
