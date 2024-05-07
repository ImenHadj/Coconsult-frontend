import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';
import { Project } from '../project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectCost: number | null = null;
  projects: any[] = []; 
  projectProgress: { [projectId: number]: number } = {}; 
  constructor( private projectService: ProjectServiceService,private router: Router ) {}
  
 
  ngOnInit(): void {
    console.log("mini.......................");
    this.projectService.getAllProjects().subscribe((datas)=>{
      this.projects=datas as any[];
      // Pour chaque projet, récupérez la progression du projet
      this.projects.forEach(project => this.getProjectProgress(project.projectid));
    })
  }


 
  onDeleteProject(projectId: number): void {
    console.log('Project ID:', projectId);
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.removeProject(projectId).subscribe(
        () => {  
          this.projectService.getAllProjects().subscribe((datas) => {
            this.projects = datas as any[];
          });
          alert('Project deleted successfully!');
        },
        error => {
          console.error('Error deleting project:', error);
          alert('An error occurred while deleting the project. Please try again later.');
        }
      );
    }
  }
  

  onUpdateProject(projectId: number): void {
    this.router.navigate(['/admin/updateP'], { queryParams: { id: projectId } });
}
  
goToCalendar(projectId: number): void {
  // Naviguer vers la route /calendar avec l'ID du projet en tant que paramètre
  this.router.navigate(['/admin/calendarT', projectId]);
}


  gotasks(projectId: number): void {
    // Naviguer vers la route /calendar avec l'ID du projet en tant que paramètre
    this.router.navigate(['/admin/tasks', projectId]);
  }


  // Méthode pour calculer le coût du projet
  calculateProjectCost(projectId: number): void {
    this.projectService.calculCostProject(projectId).subscribe(
      (cost: number) => {
        console.log('Le coût du projet a été calculé avec succès : ', cost);
        // Trouver le projet correspondant dans la liste des projets
        const projectToUpdate = this.projects.find(project => project.projectid === projectId);
        // Mettre à jour le coût du projet
        if (projectToUpdate) {
          projectToUpdate.projectCost = cost;
        }
      },
      error => {
        console.error('Une erreur s\'est produite lors du calcul du coût du projet : ', error);
      }
    );
  }



  getProjectProgress(projectId: number): void {
    this.projectService.calculateProjectProgression(projectId)
      .subscribe(progress => {
        // Stocker la progression dans l'objet projectProgress
        this.projectProgress[projectId] = progress;
      });
  }
 

  // getProjectProgress(projectId: number): void {
  //   this.projectService.calculateProjectProgression(projectId)
  //     .subscribe(progress => {
  //       // Trouver le projet correspondant dans la liste projects
  //       const projectToUpdate = this.projects.find(project => project.projectid === projectId);
        
  //       // Mettre à jour la progression du projet
  //       if (projectToUpdate) {
  //         projectToUpdate.progress = progress;
  //       }
  //     });
  // }
  
  truncatePercentage(percentage: number): number {
    return Math.floor(percentage); // Utiliser Math.floor pour arrondir vers le bas
  }

}
