import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';
import { Project } from '../project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
 // user = false;
 isDropdownOpen: boolean = false;

  projectCost: number | null = null;
  projects: any[] = []; 

  constructor( private projectService: ProjectServiceService,private router: Router ) {}
  toggleDropdown(event: MouseEvent) {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation();
  }
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isDropdownOpen && !this.dropdownMenu.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
 
  ngOnInit(): void {
    console.log("mini.......................");
    this.projectService.getAllProjects().subscribe((datas)=>{
      this.projects=datas as any[];
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






}
/**
 * 
                    <a mat-list-item routerLink="/admin/addProject">Add project</a>
                              <a mat-list-item routerLink="/admin/projects">All projects</a>
                              <a mat-list-item routerLink="/admin/dash">Dashboard Projects</a>
 * 

                               <div *ngIf="user">
                              <a mat-list-item id="aa" routerLink="/admin/clients">All Clients</a>
                              <a mat-list-item routerLink="/admin/addclient">add Clients</a>
                            </div>
 * */ 