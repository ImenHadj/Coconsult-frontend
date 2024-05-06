import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartData, TooltipItem } from 'chart.js';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';
@Component({
  selector: 'app-circular-chart-conge',
  templateUrl: './circular-chart-conge.component.html',
  styleUrls: ['./circular-chart-conge.component.css']
})
export class CircularChartCongeComponent implements OnInit {
  leavesData: any;

  constructor(private congeService: ServiceCongeService) { }

  ngOnInit(): void {
    this.loadLeavesData();
  }

  loadLeavesData() {
    this.congeService.getLeavesByEmployee().subscribe(
      (data) => {
        this.leavesData = data;
        this.renderChart();
      },
      (error) => {
        console.error('Error fetching leaves data:', error);
      }
    );
  }

  renderChart(): void {
    if (this.leavesData) {
      const keys = Object.keys(this.leavesData);
      const values = keys.map(key => this.leavesData[key]);
      const dynamicColors = keys.map(() => this.getRandomColor());

      const ctx = document.getElementById('congeChart') as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
             labels:keys,
            datasets: [{
              data: values,
              backgroundColor: dynamicColors,
              borderWidth: 3,
              keys: keys
            }]
          },
          options: {
            responsive: true,
            cutoutPercentage: 40,
            legend: {
              display: false
            }
          }
        }as any);
      }
    }
  }
 
  
  

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
