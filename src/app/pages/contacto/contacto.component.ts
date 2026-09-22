import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { SeoService } from '../../services/seo.service';


@Component({
  selector: 'app-contacto',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent implements OnInit {
  private readonly seo = inject(SeoService);
  contacForm!: FormGroup;
  constructor(private email: EmailService) {}

  ngOnInit() {
    this.initForm();
    this.seo.update(
      {
        title: 'Contacto',
        description:
          'Solicita presupuesto sin compromiso para tu reforma en Madrid. Te respondemos a la mayor brevedad posible.',
      },
      '/contacto'
    );
  }

  sendEmail() {
    if (this.contacForm.valid) {
      this.email.sendEmail(this.contacForm.value).subscribe({
        next: () => {
          alert('Email enviado');
          this.contacForm.reset();
        },
        error: () => {
          alert('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
        },
      });
    }
  }

  initForm() {
    this.contacForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      policy: new FormControl(false, Validators.requiredTrue),
    });
  }
}
