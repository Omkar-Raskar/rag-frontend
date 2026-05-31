import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponse {
  answer: string;
  sources?: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  

  private baseUrl = 'https://documentanalyzer-i8d0.onrender.com/api'; // change if needed

  constructor(private http: HttpClient) {}

 askQuestion(question: string): Observable<ChatResponse> {
  return this.http.post<ChatResponse>(
    `${this.baseUrl}/search/ask`,
    question,   // ✅ NO stringify
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
}