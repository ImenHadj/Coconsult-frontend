import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectServiceService } from '../project-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority, Project, ProjectStatus, ProjectType } from '../project.model';

@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.css']
})
export class UpdateprojectComponent implements OnInit {
  projects: any[] | undefined;
  projectId: number | undefined;
  projectForm!: FormGroup;
  projectStatusOptions: string[] = [];
  projectTypeOptions: string[] = [];
  priorityOptions: string[] = [];
 
  constructor(
    private fb: FormBuilder,
     private projectService: ProjectServiceService,
     private router: Router,
      private route: ActivatedRoute){}

  ngOnInit(): void {
    this.initForm();
    this.populateOptions();
    this.route.queryParams.subscribe(params => {
       this.projectId = params['id'];
       if (this.projectId) {
        this.getProjectDetails(this.projectId);
      }
    });

  }

  private getProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(
      (project: Project | undefined) => {
        if (project) {
          // Reformat the date before patching it into the form
          const startDate = new Date(project.startDate).toISOString().split('T')[0];
          const endDate = new Date(project.endDate).toISOString().split('T')[0];
  
          // Remplir le formulaire avec les données du projet
          this.projectForm.patchValue({
            projectname: project.projectname,
            projectdescription: project.projectdescription,
            startDate: startDate,
            endDate: endDate,
            status: project.status,
            type: project.type,
            budget: project.budget,
            priority: project.priority
          });
        } else {
          console.error('Projet introuvable:', projectId);
        }
      },
      error => {
        console.error('Erreur lors de la récupération des détails du projet:', error);
      }
    );
  }





  private populateOptions(): void {
    // Populate options based on enums
    this.projectStatusOptions = Object.values(ProjectStatus);
    this.projectTypeOptions = Object.values(ProjectType);
    this.priorityOptions = Object.values(Priority);
  }



  private initForm(): void {
    this.projectForm = this.fb.group({
      projectname: ['', Validators.required],
      projectdescription: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      budget: ['', Validators.required],
      priority: ['', Validators.required],
      
    });
  }

  updateProject(): void {
    if (this.projectForm.valid && this.projectId) {   
      const project = this.projectForm.value;
    this.projectService.updateProject(this.projectId, project)
      .subscribe(updatedProject => {
        console.log('project updated successfully:', updatedProject);
            // Mettre à jour la liste des projets après la mise à jour réussie 
            this.projectService.getAllProjects().subscribe(
              data => {
                this.projects = data; 
                // Mettre à jour la liste des projets avec les données mises à jour
              },
              error => {
                console.error('Erreur lors de la récupération des projets après la mise à jour:', error);
              }
            ); 
            // Redirection vers la page des projets après la mise à jour réussie
        this.router.navigate(['admin/projects']);    
        },
         error => {
        console.error('Erreur lors de la mise à jour du projet :', error);
      });
  }
}
  onCancel(): void {
      this.router.navigate(['admin/projects']);
  
  }


}
