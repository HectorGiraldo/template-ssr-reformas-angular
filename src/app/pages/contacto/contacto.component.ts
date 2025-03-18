import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent implements OnInit {
  contacForm!: FormGroup;
  constructor(private email: EmailService) {}

  ngOnInit() {
    this.initForm();
  }

  sendEmail() {
    this.email.sendEmail(this.contacForm.value).subscribe(console.log);
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
