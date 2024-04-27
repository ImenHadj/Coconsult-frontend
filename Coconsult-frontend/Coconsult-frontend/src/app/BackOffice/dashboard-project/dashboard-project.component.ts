import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType,ChartDataSets } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { ProjectServiceService } from '../project-service.service';
import { Project } from '../project.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-project',
  templateUrl: './dashboard-project.component.html',
  styleUrls: ['./dashboard-project.component.css']
})
export class DashboardProjectComponent implements OnInit {

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
     
    },
    cutoutPercentage: 70,
   
  };


  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColor: Color[] = [
    { backgroundColor: ['#1dc0c9', '#021b41', '#4e3dc8'] },
  ];
  projects: any[] = []; 
  bestProject: Project | undefined;

 constructor( private projectService: ProjectServiceService ,private router: Router) {}

  ngOnInit(): void {
    console.log("mini.......................");
    this.projectService.getAllProjects().subscribe((datas)=>{
      this.projects=datas as any[];
    })
    this.getTypePercentage();
    
    this.projectService.getBestProjectOfTheYear()
      .subscribe(
        (project: Project) => {
          this.bestProject = project;
        },
        (error) => {
          console.error('Erreur lors de la récupération du meilleur projet : ', error);
        }
      );
  }
  
  getTypePercentage() {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
  
    this.projectService.calculateStatisticsByType().subscribe(
      (data: any) => {
        Object.keys(data).forEach((type) => {
          // Utilisez les types de projet comme libellés
          this.doughnutChartLabels.push(type);
          // Utilisez le nombre de projets comme données
          this.doughnutChartData.push(data[type]);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }



  






  





   





}
