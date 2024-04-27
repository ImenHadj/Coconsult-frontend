import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Chart, ChartOptions } from 'chart.js/auto';
@Component({
  selector: 'app-template-b',
  templateUrl: './template-b.component.html',
  styleUrls: ['./template-b.component.css']
})
export class TemplateBComponent {
  users: any[] = [];
  pagedUsers: any[] = [];
  pageSize: number = 10; 
  currentPage: number = 1; 
  userStatsChart: any;
  userStats: any = {}; // Déclaration de la propriété userStats
  criteriaLabels: string[] = [];
  chart: any;
  performanceData: any;
  averageNotesByCriteria: any[] = []; // Initialisez averageNotesByCriteria avec un tableau vide

  constructor(private userService: UserService) { }
  ngOnInit(): void {

    this.getAllUsers();
    this.getAdvancedUserStats();
    this.getAverageNotesByCriteria();

  }

    getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  
  }
  
  deleteUser(userId: string): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (confirmation) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.getAllUsers();
      });
    }
  }
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.users.length - 1);
    this.pagedUsers = this.users.slice(startIndex, endIndex + 1);
  }

  pageChanged(event: any): void {
    this.setPage(event.page);
 
 
  }

  getAdvancedUserStats(): void {
    this.userService.getAdvancedUserStats().subscribe(
      (data: any) => {
        // Création du graphique à barres avec les données récupérées
        this.createBarChart(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  createBarChart(userStats: any): void {
    const ctx = document.getElementById('userStatsChart') as HTMLCanvasElement;
    this.userStatsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total des utilisateurs', 'Utilisateurs administrateurs', 'Utilisateurs employés'],
        datasets: [{
          label: 'Statistiques d\'utilisateurs',
          data: [userStats.totalUsers, userStats.adminUsers, userStats.employeeUsers],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            ticks: {
              beginAtZero: true
            }
          }
        }
      } as ChartOptions
    });
  }
  getAverageNotesByCriteria(): void {
    this.userService.getAverageNotesByCriteria().subscribe(
      (data: any) => {
        if (data && typeof data === 'object') {
          // Convertissez les données d'objet en tableau
          this.averageNotesByCriteria = Object.entries(data).map(([criteria, value]) => ({ criteria, value }));
          this.criteriaLabels = this.averageNotesByCriteria.map(item => item.criteria);
          this.createChart(); // Appeler la création du graphique une fois les données reçues
        } else {
          console.error('Les données retournées ne sont pas un objet ou sont vides :', data);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }
  
  createChart(): void {
    const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.criteriaLabels,
        datasets: [{
          label: 'Moyenne par critère',
          data: this.averageNotesByCriteria.map(item => item.value), // Utilisez la propriété 'value' au lieu de 'moyenne'
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }}