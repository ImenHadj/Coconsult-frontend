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
  
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
) {}

isDashboardListExpanded = true;
  absences = false;
  listAbsences = false;
  user = false;
  wallet = false;
  conge = false;
  contrat=false;
  employe = false;
  departement = false;
  Salaires = false;

  toggleDashboardList() {
    this.isDashboardListExpanded = !this.isDashboardListExpanded;
  }
  toggleContratEmployeList() {
    this.contrat = !this.contrat;
  }
  toggleSalairesList() {
    this.Salaires = !this.Salaires;
  }
  toggleAbsences() {
    this.absences = !this.absences;
  }
  toggleConges() {
    this.conge = !this.conge;
  }
  toggleListAbsences() {
    this.listAbsences = !this.listAbsences;
  }
  toggleUserList() {
    this.user = !this.user;
  }
  togglewalletList(){
    this.wallet = !this.wallet;
  }

  toggleDepartementList() {
    this.departement = !this.departement;
  }
  toggleEmployeList(){
    this.employe = !this.employe;
  }
  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }


  ngOnInit(): void {
    const currentUser = this.storageService.getUser();

    if (currentUser) {
        const roles = currentUser.roles;

        // Vérifiez si l'utilisateur a le rôle admin
        const isAdmin = roles.includes('ROLE_ADMIN');
        
        // Si l'utilisateur n'est pas admin, redirigez vers la page d'accueil ou de connexion
        if (!isAdmin) {
            this.router.navigate(['/accueil']);
        }
    } else {
        // Rediriger l'utilisateur non authentifié vers la page de connexion
        this.router.navigate(['/accueil/login']);
    }
}


  

  toggle() {
    this.sidenav.toggle();
  }
  signout(): void {
    // Supprimez le token d'authentification
    this.authService.logout().subscribe(() => {
        this.storageService.clean();
        // Redirigez l'utilisateur vers la page de connexion
        this.router.navigate(['/accueil/login']);
    });
}


}
