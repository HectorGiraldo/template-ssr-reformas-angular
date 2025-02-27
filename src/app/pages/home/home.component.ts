import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  email = Inject(EmailService);
  items = [1, 2, 3, 4, 5, 6];

  sendEmail() {
    this.email
      .sendEmail({ message: 'Hello World correo funciona' })
      .subscribe();
  }
}
