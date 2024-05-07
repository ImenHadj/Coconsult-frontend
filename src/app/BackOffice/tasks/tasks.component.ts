import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { Task } from '../task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent  implements OnInit{
  tasks: any[] = [];
  tasksToDo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksDone: Task[] = [];
  p: number = 1;
  itemsPerPage:number=3;
  projectId: number | undefined;
  constructor(private taskservice: TaskServiceService,private router:Router, private route: ActivatedRoute) {}

  navLinks = [
    { label: 'Calender', path: '/admin/calendarT/:id' },
    { label: ' Kanban', path: '/admin/kanban' },
  ];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectIdParam = params.get('id');
      if (projectIdParam !== null) {
        this.projectId = +projectIdParam;
        if (this.projectId) {
          this.taskservice.getTasksByProject(this.projectId).subscribe(tasks => {
            console.log('Tasks:', tasks); // Vérifier les données des tâches dans la console
            this.tasks = tasks;

          });
        }
      } else {
        console.error("Project ID parameter is null");
      }
    });
  }
  
  sortTasks(): void {
    this.taskservice.getSortedTasks().subscribe(sortedTasks => {
      console.log('Sorted Tasks:', sortedTasks);
      // Assign sorted tasks to your tasks array
      this.tasks = sortedTasks;
    });
  }


  organizeTasksByStatus(): void {
    this.tasksToDo = this.tasks.filter(task => task.status === 'To Do');
    this.tasksInProgress = this.tasks.filter(task => task.status === 'In Progress');
    this.tasksDone = this.tasks.filter(task => task.status === 'Done');
  }

 
  onDeleteTask(taskid: number): void {
    console.log('Task ID:', taskid);
    this.taskservice.removetask(taskid).subscribe(() => {  
      this.taskservice.getAllTasks().subscribe((datas) => {
        this.tasks = datas as any[];
      });
    });
  }
   
  onUpdateTask(taskId: number): void {
    this.router.navigate(['/admin/updateT'], { queryParams: { id: taskId } });
}




  }




