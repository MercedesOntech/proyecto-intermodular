import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../../core/services/comment';
import { AuthService } from '../../../../core/services/auth';
import { RegisterComment } from '../../../../core/models';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.css']
})
export class CommentFormComponent {
  @Output() commentCreated = new EventEmitter<any>();
  
  commentData: RegisterComment = {
    content: '',
    film_id: undefined,
    product_id: undefined
  };
  
  commentType: 'movies' | 'bar' = 'movies';
  isLoading = false;
  errorMessage = '';
  charCount = 0;
  maxChars = 500;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  updateCharCount(): void {
    this.charCount = this.commentData.content.length;
  }

  validateForm(): boolean {
    if (!this.commentData.content.trim()) {
      this.errorMessage = 'Por favor, escribe un comentario';
      return false;
    }
    
    if (this.commentData.content.length < 5) {
      this.errorMessage = 'El comentario debe tener al menos 5 caracteres';
      return false;
    }
    
    if (this.commentData.content.length > this.maxChars) {
      this.errorMessage = `El comentario no puede tener más de ${this.maxChars} caracteres`;
      return false;
    }
    
    return true;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }
    
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.errorMessage = 'Debes iniciar sesión para comentar';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.commentService.createComment(this.commentData, user.id).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.commentCreated.emit(response.data);
        this.resetForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al publicar el comentario';
      }
    });
  }

  resetForm(): void {
    this.commentData = {
      content: '',
      film_id: undefined,
      product_id: undefined
    };
    this.charCount = 0;
    this.errorMessage = '';
  }

  selectCommentType(type: 'movies' | 'bar'): void {
    this.commentType = type;
    if (type === 'movies') {
      this.commentData.film_id = 1; // Aquí puedes seleccionar película específica
      this.commentData.product_id = undefined;
    } else {
      this.commentData.product_id = 1; // Aquí puedes seleccionar producto específico
      this.commentData.film_id = undefined;
    }
  }
}