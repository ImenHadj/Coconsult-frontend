import { Component, OnInit, ViewChild } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-sidebar-back',
  templateUrl: './sidebar-back.component.html',
  styleUrls: ['./sidebar-back.component.css']
})
export class SidebarBackComponent implements CanActivate, OnInit {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    isDashboardListExpanded = false;
    user = false;
    wallet = false;
    projects = false; // Ajout de la propriété pour gérer l'état de la liste des projets

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router
    ) {}

    // Méthode canActivate pour vérifier si l'utilisateur est connecté
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

    // Méthode ngOnInit pour toute initialisation supplémentaire
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

    // Méthode pour basculer l'expansion de la liste du tableau de bord
    toggleDashboardList(): void {
        this.isDashboardListExpanded = !this.isDashboardListExpanded;
    }

    // Méthode pour basculer l'expansion de la liste des utilisateurs
    toggleUserList(): void {
        this.user = !this.user;
    }

    // Méthode pour basculer l'expansion de la liste du portefeuille
    toggleWalletList(): void {
        this.wallet = !this.wallet;
    }

    // Méthode pour basculer l'expansion de la liste des projets
    toggleProjectsList(): void {
        this.projects = !this.projects;
    }

    // Méthode pour vérifier si la route est active
    isRouteActive(route: string): boolean {
        return this.router.isActive(route, true);
    }

    // Méthode pour se déconnecter
    signout(): void {
        // Supprimez le jeton d'authentification
        this.authService.logout().subscribe(() => {
            this.storageService.clean();
            // Redirigez l'utilisateur vers /accueil
            this.router.navigate(['/accueil']);
        });
    }

    // Méthode pour basculer le sidenav
    toggle(): void {
        this.sidenav.toggle();
    }
}
