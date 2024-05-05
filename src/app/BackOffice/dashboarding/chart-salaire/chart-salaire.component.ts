import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { ServiceSalaireService } from 'src/app/core/services/service-salaire.service';

@Component({
  selector: 'app-chart-salaire',
  templateUrl: './chart-salaire.component.html',
  styleUrls: ['./chart-salaire.component.css']
})
export class ChartSalaireComponent {
  monthlyReport: any;
  salaryEvolution: any;
  salaryStatistics: any;
  selectedDate: string = ''; // Holds the selected date
  chosenYear: number | null = null;
  chosenMonth: number | null = null;
  salaryStatisticsChart: Chart | undefined;

  constructor(private salaryService: ServiceSalaireService) {}

  ngOnInit(): void {
    this.getTotalSalariesEvolution();

    const defaultYear = 2024;
    const defaultMonth = 4;
    this.generateSalaryStatistics(defaultYear, defaultMonth);
  }

  onDateChange(): void {
    if (this.selectedDate) {
      const date = new Date(this.selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      this.generateSalaryStatistics(year, month);
    }
  }

  getTotalSalariesEvolution(): void {
    this.salaryService.getTotalSalariesEvolution().subscribe(data => {
      this.salaryEvolution = data;
      this.renderSalaryEvolutionChart(this.salaryEvolution);
    });
  }

  generateSalaryStatistics(year: number, month: number): void {
    this.salaryService.getSalaryStatistics(year, month).subscribe(data => {
      this.salaryStatistics = data;
      this.renderChart();
    });
  }

  renderChart(): void {
    const statisticLabels = ['MaxSalary', 'TotalSalaries', 'MinSalary', 'AverageSalary'];
    const statisticValues = statisticLabels.map(label => this.salaryStatistics[label]);

    const ctx = document.getElementById('salaryStatisticsChart') as HTMLCanvasElement;
    if (ctx) {
      if (this.salaryStatisticsChart) {
        this.salaryStatisticsChart.destroy();
      }

      this.salaryStatisticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: statisticLabels,
          datasets: [{
            label: 'Salary Statistics',
            data: statisticValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }

  renderSalaryEvolutionChart(salaryEvolutionData: { [date: string]: number }): void {
    const labels = Object.keys(salaryEvolutionData).map(dateStr => {
      const date = this.parseDate(dateStr);
      return `${date.getDate()} ${this.getMonthName(date.getMonth())}`;
    });
    const data = Object.values(salaryEvolutionData);

    const chart = new Chart('salaryEvolutionChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Salary Evolution',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor:'rgb(0,0,0)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            ticks: {
              callback: function (value: number) {
                return value.toString();
              }
            }
          }
        }
      }
    }as any);
  }

  parseDate(dateStr: string): Date {
    const parts = dateStr.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return monthNames[monthIndex];
  }
}
