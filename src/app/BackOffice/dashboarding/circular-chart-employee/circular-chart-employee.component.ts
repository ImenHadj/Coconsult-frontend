import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
@Component({
  selector: 'app-circular-chart-employee',
  templateUrl: './circular-chart-employee.component.html',
  styleUrls: ['./circular-chart-employee.component.css']
})
export class CircularChartEmployeeComponent implements OnInit, OnChanges {
  @Input() percentage: number = 0;
  @Input() nbreEmpl: number = 0;

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    cutoutPercentage: 40,
  };
  public doughnutChartLabels: Label[] = ["employe have note > 3", "employe have note < 3"];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColor: Color[] = [
    { backgroundColor: ['#f68059', '#ffbf3a', '#4e3dc8'] },
  ];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percentage'] || changes['nbreEmpl'] ) {
      this.updateChartData();
    }
  }
  private updateChartData(): void { 

    this.doughnutChartData = [this.percentage , this.nbreEmpl - this.percentage];
  }
}
