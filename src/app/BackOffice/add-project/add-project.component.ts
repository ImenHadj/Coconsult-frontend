import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectServiceService } from '../project-service.service';
import { FormsModule } from '@angular/forms';
import { ProjectStatus, ProjectType, Priority } from '../project.model'; // Assuming project.ts is in the same directory
import { Router } from '@angular/router';
import { ServiceclientService } from '../serviceclient.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

 
  projectForm!: FormGroup;
  projectStatusOptions: string[] = [];
  projectTypeOptions: string[] = [];
  priorityOptions: string[] = [];
  clients: any[] = [];
 
  constructor(private fb: FormBuilder, private projectService: ProjectServiceService,private router: Router, private clientservice: ServiceclientService) {}
 

  ngOnInit(): void {
    this.initForm();
    this.populateOptions();
    this.clientservice.getall().subscribe((datas) => {
      this.clients = datas as any[];
    })
  }

  private initForm(): void {
    this.projectForm = this.fb.group({
      projectname: ['', Validators.required],
      projectdescription: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      budget: ['', Validators.required],
      priority: ['', Validators.required],
      expectedRevenue: ['', Validators.required],
      clientid:['']
      
    });
  }
  private populateOptions(): void {
    // Populate options based on enums
    this.projectStatusOptions = Object.values(ProjectStatus);
    this.projectTypeOptions = Object.values(ProjectType);
    this.priorityOptions = Object.values(Priority);
  }

  //onSubmit(): void {
   /* if (this.projectForm.valid) {
      const project = this.projectForm.value;
       // Convertir les chaînes de dates en objets Date
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
      this.projectService.addProject(project).subscribe(
        (projectId ) => {
          console.log('Project added successfully with ID:', projectId);
          window.location.reload(); // Recharge la page après l'ajout du projet
        },
        (error ) => {
          console.error('Error adding project:', error);
        }
      );
      this.router.navigate(['admin/tasks']); 
    }*/

   /* if (this.projectForm.valid) {
      const project = this.projectForm.value;
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
      this.projectService.addProjectandasseignclient(project.clientid,project).subscribe(
        (projectId ) => {
          console.log('Project added successfully with ID:', projectId);
          window.location.reload(); // Recharge la page après l'ajout du projet
        },
        (error ) => {
          console.error('Error adding project:', error);
        }
      );
      this.router.navigate(['admin/tasks']); 
    }*/
    
 // }
 onSubmit(): void {
  if (this.projectForm.valid) {
    const project = this.projectForm.value;
    // Convert the date strings to Date objects
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);

    // Check if clientid is empty
    if (!project.clientid) {
      // Call the function if clientid is empty
      this.functionWhenClientIdIsEmpty(project);
    } else {
      // Call the function if clientid is not empty
      this.functionWhenClientIdIsNotEmpty(project);
    }
  }
}
  functionWhenClientIdIsEmpty(project: any): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
       // Convertir les chaînes de dates en objets Date
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
      this.projectService.addProject(project).subscribe(
        (projectId ) => {
          console.log('Project added successfully with ID:', projectId);
          window.location.reload(); // Recharge la page après l'ajout du projet
        },
        (error ) => {
          console.error('Error adding project:', error);
        }
      );
      this.router.navigate(['admin/tasks']); 
    }
  }
  functionWhenClientIdIsNotEmpty(project: any): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
      this.projectService.addProjectandasseignclient(project.clientid,project).subscribe(
        (projectId ) => {
          console.log('Project added successfully with ID:', projectId);
          window.location.reload(); // Recharge la page après l'ajout du projet
        },
        (error ) => {
          console.error('Error adding project:', error);
        }
      );
      this.router.navigate(['admin/tasks']); 
    }
  }
 



}
