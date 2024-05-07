
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    totpSecret: null // Ajoutez un champ pour le code OTP
    
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  


  onSubmit(): void {
    const { username, password, totpSecret } = this.form;
  
    this.authService.login(username, password, totpSecret).subscribe({
      next: data => {
        this.storageService.saveToken(data.accessToken);
        this.storageService.saveUser(data);
  
        // Vérifier si l'utilisateur a le rôle d'administrateur
        const roles = this.storageService.getUser().roles;
        if (roles.includes('ROLE_ADMIN')) {
          // Rediriger vers la route admin si l'utilisateur est un administrateur
          this.router.navigate(['/admin/homef']);
        } 
        if (roles.includes('ROLE_PRODUCT_OWNER')) {
          // Rediriger vers la route admin si l'utilisateur est un administrateur
          this.router.navigate(['accueil/Clienthome']);
        }
        else {
          // Rediriger vers la route home si l'utilisateur n'est pas un administrateur
          this.router.navigate(['accueil/home']);
        }
  
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });}
  
  


  
  
  
  reloadPage(): void {
    window.location.reload();
  }
}

