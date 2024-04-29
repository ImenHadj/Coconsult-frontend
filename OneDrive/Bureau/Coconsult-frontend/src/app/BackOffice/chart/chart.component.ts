import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../project-service.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  profitabilityData: any[] = [];
  profitabilityByYear: Map<number, number> = new Map<number, number>();
  constructor(private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.projectService.calculateProfitabilityForEachProject().subscribe(
      data => {
        console.log('Profitability data received:', data); // Log the profitability data received from the service
        this.profitabilityData = data;
        this.renderChart();
      },
      error => {
        console.error("Error fetching profitability data:", error);
      }
    );

    
  }

  renderChart(): void {
    const projectNames = this.profitabilityData.map(item => item[0].projectname);
    const profitabilityValues = this.profitabilityData.map(item => item[1]);
    console.log('Project names:', projectNames); // Log the project names
    console.log('Profitability values:', profitabilityValues); // Log the profitability values

    const ctx = document.getElementById('profitabilityChart') as HTMLCanvasElement;
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: projectNames,
          datasets: [{
            label: 'Profitability',
            data: profitabilityValues,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
           ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      } as any); // Add this to workaround type errors
    }
  }

 
}






