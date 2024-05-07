import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../Fournisseur/fournisseur.model';
import { FournisseurService } from '../Fournisseur/fournisseur.service';
import Chart from 'chart.js/auto';
import { StockService } from '../Stock/stock.service';
import { ResourcesCategorie, Stock } from '../Stock/stock.model';
import { ResourcesService } from '../Resources/resources.service';

interface QualityTrendItem {
  date: Date;
  quality: string;
}

@Component({
  selector: 'app-home-back',
  templateUrl: './home-back.component.html',
  styleUrls: ['./home-back.component.css']
})
export class HomeBackComponent implements OnInit {

  topThreeFournisseurs: Fournisseur[] = [];
  stocks: Stock[] = [];
  qualityTrendData: QualityTrendItem[] = [];
  resourceStockData: any[] = [];
  username :any;

  

  constructor(private fournisseurService: FournisseurService, private stockService: StockService,private resourcesService: ResourcesService) { }

  ngOnInit(): void {
    this.fournisseurService.getTopThreeFournisseursWithStocks().subscribe(
      (fournisseurs: Fournisseur[]) => {
        this.topThreeFournisseurs = fournisseurs;
        
        this.topThreeFournisseurs.forEach((fournisseur: Fournisseur) => {
          
          if (fournisseur.fournisseurID !== undefined) {
            this.fournisseurService.getNombreStocksFournisseur(fournisseur.fournisseurID).subscribe(
              (nbStocks: number) => {
                
                fournisseur.nbStocks = nbStocks;
              },
              (error) => {
                console.log(error);
              }
            );
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );

    this.stockService.getStocks().subscribe(data => {
      this.stocks = data;
      this.drawGraph();
  });

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

  drawGraph(): void {
    // Limiter les catégories aux trois premières catégories
    const categories = Object.values(ResourcesCategorie).slice(0, 3);

    // Calculer les données pour ces trois catégories uniquement
    const data = categories.map(category => {
        const categoryStocks = this.stocks.filter(stock => stock.categorieStock === category);
        const totalQuantity = categoryStocks.reduce((acc, curr) => acc + curr.quantity, 0);
        const averageDefectsPercentage = categoryStocks.reduce((acc, curr) => acc + curr.pourcentageDefauts, 0) / categoryStocks.length;
        return { category, totalQuantity, averageDefectsPercentage };
    });

    // Convertir les catégories en chaînes de caractères pour les utiliser comme libellés
    const labels = categories.map(category => category.toString()); 

    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    if (ctx) {
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Quantity',
                    data: data.map(item => item.totalQuantity),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'Average Defects Percentage',
                    data: data.map(item => item.averageDefectsPercentage),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category', // Définir l'échelle de l'axe x comme une échelle de catégorie
                        labels: labels, // Utiliser les noms des catégories comme libellés d'axe
                        display: true // Afficher les libellés de l'axe des abscisses
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

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