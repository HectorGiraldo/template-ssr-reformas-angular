import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from './data.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly dataSvc = inject(DataService);
  product$ = this.dataSvc.getProducts();
}
