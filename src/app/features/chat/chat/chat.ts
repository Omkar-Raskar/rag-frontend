import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, ChatResponse } from '../../../core/services/chat';
import { DocumentService } from '../../../core/services/document';

type Message = {
  role: 'user' | 'ai';
  content: string;
  sources?: string[];
  showSources?: boolean;
};

type UploadedDoc = {
  name: string;
  size: number;
};

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {

  @ViewChild('messagesArea') messagesArea!: ElementRef;

  userInput    = '';
  messages: Message[]     = [];
  documents: UploadedDoc[] = [];
  isLoading    = false;
  isUploading  = false;
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
    private documentService: DocumentService
  ) {}

  /* ── File selection ── */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  /* ── Upload ── */
  uploadDocument(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;

    this.documentService.upload(this.selectedFile).subscribe({
      next: (res: any) => {
        console.log('Upload success:', res);
        this.documents.push({ name: this.selectedFile!.name, size: this.selectedFile!.size });
         this.isUploading  = false;
        this.successMessage = 'Document uploaded successfully!';
        setTimeout(() => {
  this.successMessage = '';
}, 3000);
        this.selectedFile = null;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Upload error:', err);
         this.isUploading  = false;
          this.errorMessage = 'Upload failed. Please try again.';
          setTimeout(() => {
  this.errorMessage = '';
}, 3000);
        this.cdr.detectChanges();
      }
    });
  }

  copyText(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied');
  });
}

  /* ── Send message ── */
  sendMessage(): void {
    if (!this.userInput.trim() || this.isLoading) return;

    const question = `"${this.userInput.trim()}"`;
  

    // Push user message
    this.messages = [...this.messages, { role: 'user', content: question }];

    // Push AI placeholder
    const aiIndex = this.messages.length;
    this.messages = [...this.messages, { role: 'ai', content: '__thinking__' }];

    this.userInput = '';
    this.isLoading = true;
    this.scrollToBottom();

    this.chatService.askQuestion(question).subscribe({
      next: (res: ChatResponse) => {
        console.log('API response:', res);
        this.messages[aiIndex].content     = res?.answer  || 'No response received.';
        this.messages[aiIndex].sources     = res?.sources || [];
        this.messages[aiIndex].showSources = false;
        this.isLoading = false;
        this.cdr.detectChanges();
        this.scrollToBottom();
      },
      error: (err: any) => {
        console.error('Chat error:', err);
        this.messages[aiIndex].content = 'Something went wrong. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
        this.scrollToBottom();
      }
    });
  }

  /* ── Clear chat ── */
  clearChat(): void {
    this.messages = [];
    this.cdr.detectChanges();
  }

  /* ── Auto-scroll ── */
  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesArea?.nativeElement) {
        this.messagesArea.nativeElement.scrollTop =
          this.messagesArea.nativeElement.scrollHeight;
      }
    }, 50);
  }
}
