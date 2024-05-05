import { Component } from '@angular/core';
import { TeamserviceService } from '../../teamservice.service';
import { Team } from '../../team.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.css']
})
export class ListTeamsComponent {
projects: any;
onAddMembers(teamId: number): void {
  this.router.navigate(['/admin/updateteam'], { queryParams: { id: teamId } });
}
onUpdateTeam(teamId: number): void {
  this.router.navigate(['/admin/updateteam'], { queryParams: { id: teamId } });
}
onDeleteTeam(teamId: number): void {
  if (confirm('Are you sure you want to delete this team?')) {
    this.teamService.removeTeam(teamId).subscribe(
      () => {
        console.log('Team removed successfully');
        // Actualiser la liste des équipes après la suppression
        this.refreshTeamList();
        alert('Team deleted successfully!');
      },
      (error) => {
        console.error('Error removing team:', error);
        alert('An error occurred while deleting the team. Please try again later.');
      }
    );
  }
}

// Fonction pour actualiser la liste des équipes après la suppression
refreshTeamList(): void {
  this.teamService.getAllTeams().subscribe(
    (teams) => {
      this.teams = teams as any[]; // Mettre à jour la liste des équipes
    },
    (error) => {
      console.error('Error refreshing team list:', error);
      // Gérer l'erreur si nécessaire
    }
  );
}


teams: any[] | undefined; // Déclarez un tableau pour stocker les équipes
employees: any[] = [];
teamId: number = 0;

  constructor(private teamService: TeamserviceService, private router: Router, ) { }

  ngOnInit(): void {
    this.getAllTeams(); // Appelez la fonction pour récupérer les équipes lors de l'initialisation du composant
  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe(
      (data: any[]) => {
        this.teams = data; // Stockez les équipes récupérées dans le tableau déclaré
        console.log('Teams:', this.teams); // Ajoutez un log pour vérifier les données récupérées
      },
      (error) => {
        console.log('Error fetching teams:', error); // Log de l'erreur lors de la récupération des équipes
      }
    );
  }
  
  // assignEmployeesToTeam(): void {
  //   this.teamService.assignEmployeesToTeam(this.employees, this.teamId).subscribe(() => {
  //     this.toastr.success('Employees affected successfully to the team.'); // Notification for success
  //     // Add logic for redirection or success notification here
  //   }, error => {
  //     if (error.includes('team limit')) {
  //       this.toastr.error('You have exceeded the team limit.'); // Notification for exceeding team limit error
  //     } else {
  //       this.toastr.error('Error assigning employees to the team.'); // Other error notification
  //     }
  //     console.error('Error assigning employees to the team:', error);
  //     // Add error handling logic here
  //   });
  // }
 
 
  
  
}

