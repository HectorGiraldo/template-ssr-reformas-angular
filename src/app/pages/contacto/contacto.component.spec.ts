import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ContactoComponent } from './contacto.component';
import { EmailService } from '../../services/email.service';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;
  let emailService: jasmine.SpyObj<EmailService>;

  beforeEach(async () => {
    emailService = jasmine.createSpyObj<EmailService>('EmailService', ['sendEmail']);

    await TestBed.configureTestingModule({
      imports: [ContactoComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: EmailService, useValue: emailService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds the form with all fields required, plus email format and policy checkbox', () => {
    const form = component.contacForm;
    expect(form.valid).toBeFalse();

    form.setValue({
      name: 'Juan',
      email: 'not-an-email',
      phone: '600000000',
      message: 'Hola, quiero un presupuesto',
      policy: true,
    });
    expect(form.get('email')?.valid).toBeFalse();

    form.patchValue({ email: 'juan@test.com' });
    expect(form.valid).toBeTrue();

    form.patchValue({ policy: false });
    expect(form.valid).toBeFalse();
  });

  it('does not call EmailService when the form is invalid', () => {
    component.sendEmail();
    expect(emailService.sendEmail).not.toHaveBeenCalled();
  });

  it('sends the email and resets the form on success', () => {
    spyOn(window, 'alert');
    emailService.sendEmail.and.returnValue(of({ success: true }));
    const formValue = {
      name: 'Juan',
      email: 'juan@test.com',
      phone: '600000000',
      message: 'Hola, quiero un presupuesto',
      policy: true,
    };
    component.contacForm.setValue(formValue);

    component.sendEmail();

    expect(emailService.sendEmail).toHaveBeenCalledWith(formValue);
    expect(window.alert).toHaveBeenCalledWith('Email enviado');
    expect(component.contacForm.value.name).toBeNull();
  });

  it('shows an error alert and keeps the form filled when the request fails', () => {
    spyOn(window, 'alert');
    emailService.sendEmail.and.returnValue(throwError(() => new Error('network error')));
    const formValue = {
      name: 'Juan',
      email: 'juan@test.com',
      phone: '600000000',
      message: 'Hola, quiero un presupuesto',
      policy: true,
    };
    component.contacForm.setValue(formValue);

    component.sendEmail();

    expect(window.alert).toHaveBeenCalledWith(
      'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.'
    );
    expect(component.contacForm.value).toEqual(formValue);
  });
});
