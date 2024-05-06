import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { TaskServiceService } from '../task-service.service';
import { Task } from '../task.model';
@Component({
  selector: 'app-task-calender',
  templateUrl: './task-calender.component.html',
  styleUrls: ['./task-calender.component.css']
})
export class TaskCalenderComponent implements OnInit{


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    
  };
  
  tasks: Task[] | undefined ; // Liste des tâches du projet sélectionné
  events: EventInput[] = [];
  projectId: any;
 
  constructor(private route: ActivatedRoute, private taskservice: TaskServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectIdParam = params.get('id');
      if (projectIdParam !== null) {
        this.projectId = +projectIdParam;
        if (this.projectId) {
          this.taskservice.getTasksByProject(this.projectId).subscribe(tasks => {
            console.log('Tasks:', tasks); // Vérifier les données des tâches dans la console
            this.tasks = tasks;
            this.updateEvents();
          });
        }
      } else {
        console.error("Project ID parameter is null");
      }
    });
  }
  

  updateEvents(): void {
    if (this.tasks) {
    this.events = this.tasks.map(task => ({
      title: task.taskname,
      start: task.startDate,
      end: task.endDate,
      // Ajoutez d'autres propriétés d'événement si nécessaire
    }));
  }
    // Mettre à jour les options du calendrier avec les nouveaux événements
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
    console.log('Events:', this.calendarOptions.events); // Vérifier les événements dans la console

  }
  
  }









  /*  this.route.params.subscribe(params => {
      const projectId = params['projectId'];
      if (projectId) {
        // Chargez les tâches du projet depuis votre backend en utilisant le service de tâche
        this.taskservice.getTasksByProject(projectId).subscribe(tasks => {
          this.tasks = tasks;
          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.events,
            
          };
        });
      }
    });
  }*/


