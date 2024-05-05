import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';
import { Project } from '../project.model';
import { Task } from '../task.model';
import { Router } from '@angular/router';
import { Chart, ChartOptions, ChartType, Color } from 'chart.js';
import { TaskServiceService } from '../task-service.service';


@Component({
  selector: 'app-dashboard-project',
  templateUrl: './dashboard-project.component.html',
  styleUrls: ['./dashboard-project.component.css']
})
export class DashboardProjectComponent implements OnInit {

  @ViewChild('doughnutChartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  projects: any[] = [];
  bestProject: Project | undefined;
  chartInstance: Chart | null = null;
  
  tasks: Task[] = [];
  projectTasksVisible: boolean = false;
  selectedProjectId: number | null = null;

  constructor(private projectService: ProjectServiceService,private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((datas) => {
      this.projects = datas as any[];
    });
    this.getTypePercentage();

    this.projectService.getBestProjectOfTheYear().subscribe(
      (project: Project) => {
        this.bestProject = project;
      },
      (error) => {
        console.error('Erreur lors de la récupération du meilleur projet : ', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  getTypePercentage() {
    this.projectService.calculateStatisticsByType().subscribe(
      (data: any) => {
        const doughnutChartCanvas = this.chartCanvas.nativeElement;
        const ctx = doughnutChartCanvas.getContext('2d');

        if (ctx) {
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
          this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: Object.keys(data),
              datasets: [{
                data: Object.values(data),
                backgroundColor: ['#1dc0c9', '#021b41', '#4e3dc8'], // Update colors as needed
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              cutoutPercentage: 70,
              plugins: {
                legend: {
                  display: true
                }
              }
            }
          }as any);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleTasks(projectId: number): void {
    if (this.selectedProjectId === projectId) {
      this.projectTasksVisible = !this.projectTasksVisible;
    } else {
      this.selectedProjectId = projectId;
      this.projectTasksVisible = true;
      this.loadTasks(projectId);
    }
  }

  loadTasks(projectId: number): void {
    this.taskService.getTasksByProject(projectId).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Erreur lors du chargement des tâches du projet : ', error);
      }
    );
  }

}
