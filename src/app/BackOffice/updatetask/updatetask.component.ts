import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../project-service.service';
import { Task } from '../task.model';
import { Priority, TaskStatus, TypeDependance } from '../task.model';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  taskForm!: FormGroup;
  projects: any[] =[]; 
  tasks: any[] | undefined;
  taskId: number | undefined;
priorityOptions: string[] = [];
statusOptions: string[] = [];
typeDependanceOptions:string[] = [];


  constructor(private fb: FormBuilder, private TaskService: TaskServiceService, private route: ActivatedRoute,
    private router: Router, private projectService: ProjectServiceService) {}


  ngOnInit(): void {
    this.initForm();
    this.populateOptions();
   
    this.route.queryParams.subscribe(params => {
       this.taskId = params['id'];
       console.log('Task ID:', this.taskId);
       if (this.taskId) {
        this.getTaskDetails(this.taskId);
      }
    });
  
  }
 

  private getTaskDetails(taskId: number): void {
    this.TaskService.getTaskById(taskId).subscribe(
      (task: Task | undefined) => {
        
        if (task) {
          // Reformat the date before patching it into the form
          const startDate = new Date(task.startDate).toISOString().split('T')[0];
          const endDate = new Date(task.endDate).toISOString().split('T')[0];
          const dueDate = new Date(task.dueDate).toISOString().split('T')[0];
          // Fill the form with task data
          this.taskForm.patchValue({
            taskname: task.taskname,
            taskdescription: task.taskdescription,
            startDate: startDate,
            endDate: endDate,
            dueDate: dueDate,
            status: task.status,
            duration: task.duration,
            priority: task.priority,
            typeDependance: task.typeDependance,
          
          });
        } else {
          console.error('Task not found:', taskId);
        }
      },
      error => {
        console.error('Error fetching task details:', error);
      }
    );
  }


  populateOptions() {
   // Populate options based on enums
   this.statusOptions = Object.values(TaskStatus);
   this.typeDependanceOptions = Object.values(TypeDependance);
   this.priorityOptions = Object.values(Priority);
  }

  initForm() {
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


  updateTask(): void {
    if (this.taskForm.valid && this.taskId) {   
      const task = this.taskForm.value;
      console.log('Updating task with ID:', this.taskId, 'Data:', task);
    this.TaskService.updateTask(this.taskId, task)
      .subscribe(updatedTask => {
        console.log('task updated successfully:', updatedTask);
            // Mettre à jour la liste des projets après la mise à jour réussie 
            this.TaskService.getAllTasks().subscribe(
              data => {
                this.tasks = data; 
                // Mettre à jour la liste des projets avec les données mises à jour
              },
              error => {
                console.error('Erreur lors de la récupération des taches après la mise à jour:', error);
              }
            ); 
            // Redirection vers la page des projets après la mise à jour réussie
        this.router.navigate(['admin/tasks']);    
        },
         error => {
        console.error('Erreur lors de la mise à jour du task :', error);
      });
  }
}
  onCancel(): void {
      this.router.navigate(['admin/tasks']);
  
  }





}
