import { Component, OnInit } from '@angular/core';
import { CardSettingsModel,SwimlaneSettingsModel, DialogEventArgs, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import{DataManager,ODataAdaptor} from '@syncfusion/ej2-data';
import { ProjectServiceService } from '../project-service.service';
import { TaskServiceService } from '../task-service.service';
import { Project,ProjectStatus} from '../project.model';
import { Task ,TaskStatus} from '../task.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit{
  public tasks: Task[] = [];
  public dataSource: DataManager | undefined;
  public cardSettings: CardSettingsModel | undefined;
  public swimlaneSettings: SwimlaneSettingsModel | undefined;

  constructor(private taskService: TaskServiceService) {

    this.cardSettings = {
      contentField: 'taskdescription', // Champ pour le contenu de la carte
      headerField: 'taskname' // Champ pour l'en-tête de la carte
      // Ajoutez d'autres paramètres de configuration des cartes si nécessaire
    };

    this.swimlaneSettings = {
      keyField: 'priority', // Le champ clé pour identifier les swimlanes (doit correspondre à votre structure de données)
  };
  }

  ngOnInit(): void {
    console.log('Chargement des projets...');
    this.loadTask();
  }

  loadTask(): void {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      console.log('tasks chargés avec succès :', tasks);
      this.tasks = tasks;
      this.updateDataSource();
    }, error => {
      console.error('Erreur lors du chargement des projets :', error);
    });
  }

  updateDataSource(): void {
    console.log('Mise à jour du dataSource...');
    this.dataSource = new DataManager(this.tasks);
   
  }
}
