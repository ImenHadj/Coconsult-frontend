import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectServiceService } from '../project-service.service';
import { FormsModule } from '@angular/forms';
import { ProjectStatus, ProjectType, Priority } from '../project.model'; // Assuming project.ts is in the same directory
import { Router } from '@angular/router';


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
 
  constructor(private fb: FormBuilder, private projectService: ProjectServiceService,private router: Router) {}
 

  ngOnInit(): void {
    this.initForm();
    this.populateOptions();
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
      expectedRevenue: ['', Validators.required],
      
    });
  }
  private populateOptions(): void {
    // Populate options based on enums
    this.projectStatusOptions = Object.values(ProjectStatus);
    this.projectTypeOptions = Object.values(ProjectType);
    this.priorityOptions = Object.values(Priority);
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
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
 



}
