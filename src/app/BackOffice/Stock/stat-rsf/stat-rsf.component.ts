import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ResourcesService } from '../../Resources/resources.service';
import { StockService } from '../stock.service';

interface QualityTrendItem {
  date: Date;
  quality: string;
}

@Component({
  selector: 'app-stat-rsf',
  templateUrl: './stat-rsf.component.html',
  styleUrls: ['./stat-rsf.component.css']
})
export class StatRSFComponent implements OnInit {
  qualityTrendData: QualityTrendItem[] = [];
  resourceStockData: any[] = [];

  constructor(private stockService: StockService,private resourcesService: ResourcesService) {}

  ngOnInit(): void {
    this.stockService.getQualityTrend().subscribe((data: any[]) => {
      console.log('Données reçues du service :', data); // Ajouter un log pour les données reçues
      // Assurez-vous que les dates sont des objets Date valides
      this.qualityTrendData = data.map(item => {
        console.log('Objet avant conversion de la date :', item); // Ajouter un log pour chaque objet avant conversion
        return {
          date: this.parseDate(item[0]), // Analyser la chaîne de caractères de date
          quality: item[1]
        };
      });
      console.log('Données après conversion de la date :', this.qualityTrendData); // Ajouter un log pour les données après conversion
      this.renderChart();
    });

    this.resourcesService.getResourceStockList().subscribe((data: any[]) => {
      console.log('Données de stock reçues du service :', data);
      this.resourceStockData = data;
      this.renderBarChart();
    });
  }
  
  // Fonction pour analyser la chaîne de caractères de date
  parseDate(dateStr: string): Date {
    const parts = dateStr.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
  
  renderChart(): void {
    // Formatage des étiquettes de date pour afficher le jour et le mois en anglais
    const labels = this.qualityTrendData.map(item => {
      const date = item.date;
      const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ];
      return `${date.getDate()} ${monthNames[date.getMonth()]}`;
    });
  
    const data = this.qualityTrendData.map(item => {
      switch (item.quality) {
        case 'excellent':
          return 5;
        case 'good':
          return 4;
        case 'average':
          return 3;
        case 'below average':
          return 2;
        case 'mediocre':
          return 1;
        default:
          return 0;
      }
    });
  
    const chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quality Trend',
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
              callback: function(value: string | number) {
                switch (value) {
                  case 5:
                    return 'Excellent';
                  case 4:
                    return 'Good';
                  case 3:
                    return 'Average';
                  case 2:
                    return 'Below Average';
                  case 1:
                    return 'Mediocre';
                  default:
                    return value;
                }
              }
            }
          }
        }
      }
    });
  }
  
  renderBarChart(): void {
    // Formatage des étiquettes des ressources et des quantités de stock
    const resourceNames = this.resourceStockData.map(item => item[0]);
    const stockQuantities = this.resourceStockData.map(item => item[1]);

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: resourceNames,
          datasets: [{
            label: 'Stock Quantity',
            data: stockQuantities,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
      });
    }
  }
  
}
