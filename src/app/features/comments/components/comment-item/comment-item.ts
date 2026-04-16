import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth';  

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './comment-item.html',
  styleUrls: ['./comment-item.css'] 
})
export class CommentItemComponent {
  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<number>();
  @Output() editComment = new EventEmitter<{ id: number; content: string }>();
  
  isEditing = false;
  editContent = '';
  showActions = false;

  constructor(private authService: AuthService) {}

  get canEditDelete(): boolean {
    const currentUser = this.authService.getCurrentUser();
    const userRole = this.authService.getUserRole();
    return currentUser?.id === this.comment.user_id || userRole === 'admin';
  }

  getUserInitials(): string {
    if (!this.comment.user) return 'U';
    const name = this.comment.user.name || 'Usuario';
    return name.charAt(0).toUpperCase();
  }

  getTimeAgo(): string {
    const date = new Date(this.comment.createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Justo ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return this.formatDate(date);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  startEdit(): void {
    this.isEditing = true;
    this.editContent = this.comment.content;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editContent = '';
  }

  saveEdit(): void {
    if (this.editContent.trim() && this.editContent !== this.comment.content) {
      this.editComment.emit({ id: this.comment.id, content: this.editContent });
    }
    this.isEditing = false;
  }

  onDelete(): void {
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      this.deleteComment.emit(this.comment.id);
    }
  }

  toggleActions(): void {
    this.showActions = !this.showActions;
  }
}