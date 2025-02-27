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
  constructor(private email: EmailService) {}
  items = [1, 2, 3, 4, 5, 6];

  sendEmail() {
    this.email
      .sendEmail({
        name: 'hecrtor',
        email: 'boykan30@gmail.com',
        message: 'Hello World correo funciona',
      })
      .subscribe();
  }
}
