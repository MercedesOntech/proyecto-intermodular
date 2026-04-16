import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../../core/services/comment';
import { AuthService } from '../../../../core/services/auth';
import { Comment } from '../../../../core/models';
import { CommentItemComponent } from '../../components/comment-item/comment-item';
import { CommentFormComponent } from '../comment-form/comment-form';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentItemComponent, CommentFormComponent, SpinnerComponent],
  templateUrl: './comment-list.html',
  styleUrls: ['./comment-list.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];
  isLoading = true;
  showForm = false;
  
  // Filtros
  filterType: 'all' | 'movies' | 'bar' = 'all';
  
  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.isLoading = true;
    this.commentService.getAllComments(1, 50).subscribe({
      next: (response) => {
        this.comments = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
        this.isLoading = false;
      }
    });
  }

  onCommentCreated(newComment: Comment): void {
    this.comments.unshift(newComment);
    this.showForm = false;
  }

  onCommentDeleted(commentId: number): void {
    this.comments = this.comments.filter(c => c.id !== commentId);
  }

  onCommentEdited(event: { id: number; content: string }): void {
    this.commentService.updateComment(event.id, event.content).subscribe({
      next: (response) => {
        const index = this.comments.findIndex(c => c.id === event.id);
        if (index !== -1) {
          this.comments[index].content = event.content;
        }
      },
      error: (error) => {
        console.error('Error editing comment:', error);
        alert('Error al editar el comentario');
      }
    });
  }

  get filteredComments(): Comment[] {
    if (this.filterType === 'all') {
      return this.comments;
    }
    if (this.filterType === 'movies') {
      return this.comments.filter(c => c.film_id);
    }
    return this.comments.filter(c => c.product_id);
  }

  selectFilter(type: 'all' | 'movies' | 'bar'): void {
    this.filterType = type;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}