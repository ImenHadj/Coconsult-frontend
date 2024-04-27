import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../project-service.service';
import { Priority, TaskStatus, TypeDependance } from '../task.model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  taskForm!: FormGroup;
  projects: any[] =[]; 
priorityOptions: string[] = [];
statusOptions: string[] = [];
typeDependanceOptions:string[] = [];
  constructor(private fb: FormBuilder, private TaskService: TaskServiceService, private route: ActivatedRoute,
    private router: Router, private projectService: ProjectServiceService) {}


  ngOnInit(): void {
    this.initForm();
    this.loadProjects();
    this.populateOptions();
  }
  populateOptions() {
    // Populate options based on enums
    this.statusOptions = Object.values(TaskStatus);
    this.typeDependanceOptions = Object.values(TypeDependance);
    this.priorityOptions = Object.values(Priority);
  }
 
    private initForm(): void {
      this.taskForm = this.fb.group({
        taskname: ['', Validators.required],
        taskdescription: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        duration: ['', Validators.required],
        priority: ['', Validators.required],
        progression: ['', Validators.required], 
        status: ['', Validators.required],
        dueDate: ['', Validators.required], 
        typeDependance: ['', Validators.required], 
        projectId: ['', Validators.required] // Champ pour sélectionner le projet
      });
      
  }
  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  onSubmit(): void {
  // Vérifier si taskForm est défini
  if (this.taskForm) {
    // Vérifier si le formulaire est valide
    if (this.taskForm.valid) {
      // Récupérer les données du formulaire
      const formData = this.taskForm.value;
      // Vérifier si formData et formData.projectId sont définis
      if (formData && formData.projectId) {
        // Appeler le service pour ajouter la tâche et l'associer au projet
        this.TaskService.addTaskAndAssignToProject(formData.projectId, formData).subscribe(result => {
          console.log('Task added and assigned to project:', result);
        },
        
        error => {
          console.error('Error adding task:', error);
        });
        this.router.navigate(['admin/tasks/:id']);  
      }

    } else {
      console.error('Form is invalid');
    }
  } else {
    console.error('Form is not initialized');
  }
}

  
  
  
  }


