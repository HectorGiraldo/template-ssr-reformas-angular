import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly dataSvc = inject(DataService);
  product$ = this.dataSvc.getProducts();
}
