import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-circular-chart',
  templateUrl: './circular-chart.component.html',
  styleUrls: ['./circular-chart.component.css']
})
export class CircularChartComponent implements OnInit, OnChanges {
  @Input() percentage: number = 0;
  @Input() type: number = 0;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance: Chart | null = null;

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percentage'] || changes['type']) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.renderChart();
    }
  }

  private renderChart(): void {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Available', 'Not Available'],
          datasets: [{
            data: [this.percentage, this.type - this.percentage],
            backgroundColor: ['#f68059', '#ffbf3a', '#4e3dc8'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          cutoutPercentage: 40,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      }as any);
    }
  }

}
