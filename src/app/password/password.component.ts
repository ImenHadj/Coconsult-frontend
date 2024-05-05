import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService) { }

  forgotPassword(email: string): void {
    this.authService.forgotPassword(email)
      .subscribe(
        Response => {
          console.log('Reset code sent successfully');
          // Handle success response, if needed
        },
        error => {
          console.error('Failed to send reset code', error);
          // Check if there is an error message in the error object
          if (error.error && error.error.message) {
            console.error('Error message:', error.error.message);
          }
        }
      );
  }

  resetPassword(email: string, code: string, newPassword: string): void {
    this.authService.resetPassword(email, code, newPassword)
      .subscribe(
        response => {
          console.log('Password reset successfully');
          // Handle success response, if needed
        },
        error => {
          console.error('Password reset failed', error);
          // Handle error response, if needed
        }
      );
  }}
