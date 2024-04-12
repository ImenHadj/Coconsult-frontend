import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';
@Component({
  selector: 'app-circular-chart-conge',
  templateUrl: './circular-chart-conge.component.html',
  styleUrls: ['./circular-chart-conge.component.css']
})
export class CircularChartCongeComponent implements OnInit {
  leavesData: any;


  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    cutoutPercentage: 40,
  };
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColor: Color[] = [
    { backgroundColor: [] },
  ];
  constructor(private congeService: ServiceCongeService) { }

  ngOnInit(): void {
    this.loadLeavesData();
    this.updateChartData();
  }

  loadLeavesData() {
    this.congeService.getLeavesByEmployee().subscribe(
      (data) => {
        this.leavesData = data;
        // console.log('Leaves Data:', this.leavesData);
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching leaves data:', error);
      }
    );
  
  }


  private updateChartData(): void {

    if (this.leavesData) {
      const keys = Object.keys(this.leavesData);
      this.doughnutChartLabels = keys;
  
      const values = keys.map(key => this.leavesData[key]);
      this.doughnutChartData = values;
  
      // Generate dynamic colors for each label
      const dynamicColors: string[] = [];
      for (let i = 0; i < keys.length; i++) {
        const dynamicColor = this.getRandomColor();
        dynamicColors.push(dynamicColor);
      }
  
      this.doughnutChartColor = [{ backgroundColor: dynamicColors }];
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
