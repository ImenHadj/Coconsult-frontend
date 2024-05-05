import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../Fournisseur/fournisseur.model';
import { FournisseurService } from '../Fournisseur/fournisseur.service';
import Chart from 'chart.js/auto';
import { StockService } from '../Stock/stock.service';
import { ResourcesCategorie, Stock } from '../Stock/stock.model';


@Component({
  selector: 'app-home-back',
  templateUrl: './home-back.component.html',
  styleUrls: ['./home-back.component.css']
})
export class HomeBackComponent implements OnInit {

  topThreeFournisseurs: Fournisseur[] = [];
  stocks: Stock[] = [];

  constructor(private fournisseurService: FournisseurService, private stockService: StockService) { }

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






}
