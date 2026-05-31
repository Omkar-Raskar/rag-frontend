import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

   private baseUrl = 'https://documentanalyzer-i8d0.onrender.com/api/document';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');

    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`  // ✅ JWT token
      }
    });
  }
}