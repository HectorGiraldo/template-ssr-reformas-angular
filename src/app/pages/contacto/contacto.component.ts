import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contacto',
  imports: [RouterModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  constructor(private email: EmailService) {}

  sendEmail() {
    this.email
      .sendEmail({
        name: 'hector',
        email: 'boykan30@gmail.com',
        message: 'Hello World correo funciona',
      })
      .subscribe(console.log);
  }
}
