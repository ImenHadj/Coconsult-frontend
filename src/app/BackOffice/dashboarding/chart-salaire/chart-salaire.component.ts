import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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

  constructor(private salaryService: ServiceSalaireService) { }

  ngOnInit(): void {
    // Call the function to get total salaries evolution
    this.getTotalSalariesEvolution();
  
    // Assuming you want to initially generate salary statistics for a specific year and month
    // You can replace the values 2024 and 4 with the default year and month you want
    const defaultYear = 2024;
    const defaultMonth = 4;
    this.generateSalaryStatistics(defaultYear, defaultMonth);
  }


  
  onDateChange(): void {
    // Call the method to generate salary statistics with the selected date
    if (this.selectedDate) {
      const date = new Date(this.selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
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
      const myChart = new Chart(ctx, {
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
          }
        }
      } as any); // Add this to workaround type errors
    }
  }


//   renderSalaryEvolutionChart(salaryEvolutionData: { [date: string]: number }): void {
//     const labels = Object.keys(salaryEvolutionData);
//     const data = Object.values(salaryEvolutionData);

//     const ctx = document.getElementById('salaryEvolutionChart') as HTMLCanvasElement;
//     if (ctx) {
//         const myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: 'Salary Evolution',
//                     data: data,
//                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         }as any); // A
//     }
// }
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
              tension: 0.1
          }]
      },
      options: {
          scales: {
              y: {
                  ticks: {
                      callback: function(value: number) {
                          switch (value) {
                              // Customize y-axis tick labels here if needed
                              default:
                                  return value.toString();
                          }
                      }
                  }
              }
          }
      }
  } as any);
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
