import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = '/api/sendEmail'; // Ruta de la API en Vercel

  constructor(private http: HttpClient) {}

  sendEmail(data: any) {
    console.log('data', data);

    return this.http.post(this.apiUrl, data);
  }
}
