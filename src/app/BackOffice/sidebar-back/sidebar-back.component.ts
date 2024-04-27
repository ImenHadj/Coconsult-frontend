import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar-back',
  templateUrl: './sidebar-back.component.html',
  styleUrls: ['./sidebar-back.component.css']
})
export class SidebarBackComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  
  isDashboardListExpanded = false;
  user = false;
  wallet = false;

  constructor(
      private authService: AuthService,
      private storageService: StorageService,
      private router: Router
  ) {}

  // Implémentez canActivate pour vérifier si l'utilisateur est connecté
 canActivate(): boolean {
  const currentUser = this.storageService.getUser();
  console.log("Current user:", currentUser);

  if (!currentUser) {
      console.log("User not logged in. Redirecting to /accueil/login");
      this.router.navigate(['/accueil/login']);
      return false;
  }
  
  const roles = currentUser.roles;
  console.log("User roles:", roles);

  if (!roles.includes('ROLE_ADMIN')) {
      console.log("User is not admin. Redirecting to /accueil");
      this.router.navigate(['/accueil']);
      return false;
  }
  
  return true;
}



  // ngOnInit pour toute initialisation supplémentaire
  ngOnInit(): void {
      const currentUser = this.storageService.getUser();

      // Vérifiez si l'utilisateur est connecté
      if (!currentUser) {
          // Redirigez l'utilisateur non connecté vers /accueil
          this.router.navigate(['/accueil']);
      } else {
          // Obtenez les rôles de l'utilisateur
          const roles = currentUser.roles;

          // Vérifiez si l'utilisateur a le rôle d'admin
          const isAdmin = roles.includes('ROLE_ADMIN');
          
          // Si l'utilisateur n'est pas admin, redirigez-le vers /accueil
          if (!isAdmin) {
              this.router.navigate(['/accueil']);
          }
      }
  }

  // Fonction pour basculer l'expansion de la liste du tableau de bord
  toggleDashboardList(): void {
      this.isDashboardListExpanded = !this.isDashboardListExpanded;
  }

  // Fonction pour basculer l'expansion de la liste des utilisateurs
  toggleUserList(): void {
      this.user = !this.user;
  }

  // Fonction pour basculer l'expansion de la liste du portefeuille
  togglewalletList(): void {
      this.wallet = !this.wallet;
  }

  // Vérifie si la route est active
  isRouteActive(route: string): boolean {
      return this.router.isActive(route, true);
  }

  // Fonction de déconnexion
  signout(): void {
      // Supprimez le jeton d'authentification
      this.authService.logout().subscribe(() => {
          this.storageService.clean();
          // Redirigez l'utilisateur vers /accueil
          this.router.navigate(['/accueil']);
      });
  }

  // Fonction pour basculer le sidenav
  toggle(): void {
      this.sidenav.toggle();
  }
}