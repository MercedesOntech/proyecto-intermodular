import { Injectable } from '@angular/core';
import { CommentService } from '../../../core/services/comment';
import { AuthService } from '../../../core/services/auth';

@Injectable({
  providedIn: 'root'
})
export class CommentsFeatureService {
  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  canModerate(): boolean {
    const role = this.authService.getUserRole();
    return role === 'admin' || role === 'employee';
  }
}