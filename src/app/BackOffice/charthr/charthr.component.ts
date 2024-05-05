import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ServicerecrutementService } from 'src/app/BackOffice/servicerecrutement.service';

@Component({
  selector: 'app-charthr',
  templateUrl: './charthr.component.html',
  styleUrls: ['./charthr.component.css']
})
export class CharthrComponent implements OnInit {
    private chart: Chart | null = null; // Référence pour le premier graphique
    private secondChart: Chart | null = null; // Référence pour le deuxième graphique
    items: string[] | null = null; // Liste d'éléments ou tableau pour votre logique

    constructor(private candidatService: ServicerecrutementService) {}

    ngOnInit(): void {
        // Vérifiez la variable `items` pour éviter l'erreur
        this.checkItemsIncludes();
        
        // Charge les données et crée les graphiques
        this.loadData();
        this.loadSecondChartData();
    }

    private checkItemsIncludes(): void {
        // Assurez-vous que `items` est défini et que la méthode `includes` existe
        if (this.items && typeof this.items.includes === 'function') {
            // Appelez `includes` en toute sécurité
            const containsValue = this.items.includes('valeur'); // Remplacez 'valeur' par la valeur que vous voulez vérifier
            // Faites quelque chose avec `containsValue`
        }
    }
    private loadData(): void {
        // Charge les données à partir du service
        this.candidatService.getNombreCandidatsParPoste().subscribe((data) => {
            // Convertit les données en étiquettes et valeurs
            const labels = Object.keys(data);
            const datasetData = Object.values(data);

            // Crée le premier graphique
            this.createLineChart(labels, datasetData);
        });
    }

    private createLineChart(labels: string[], data: number[]): void {
        // Détruisez le graphique existant s'il existe
        if (this.chart) {
            this.chart.destroy();
        }
    
        // Récupérez le `canvas` par son ID 'barChart'
        const canvasElement = document.getElementById('barChart') as HTMLCanvasElement;
    
        // Vérifiez que le `canvas` est présent dans le DOM
        if (canvasElement) {
            // Obtenez le contexte de rendu 2D
            const context = canvasElement.getContext('2d');
    
            // Créez le graphique Chart.js
            if (context) {
                this.chart = new Chart(context, {
                    type: 'line', // Changer le type de graphique à 'line'
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Nombre de candidats par poste',
                                data,
                                // Vous pouvez personnaliser le style de la ligne ici
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderWidth: 2, // Largeur de la ligne
                                tension: 0.4, // Lissage de la ligne (courbe)
                                pointRadius: 4, // Taille des points
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true, // Commencez l'axe y à zéro
                            },
                            x: {
                                offset: true,
                            },
                        },
                        layout: {
                            padding: {
                                left: 300, // Ajustez cette valeur pour décaler le graphique
                            },
                        },
                        elements: {
                            line: {
                                tension: 0.4, // Ajoute une courbe à la ligne (0 pour une ligne droite)
                            },
                        },
                    },
                });
            } else {
                console.error('Failed to acquire rendering context for canvas "barChart".');
            }
        }
    }
    

    private loadSecondChartData(): void {
        // Charge les données à partir du service candidatService.ParExperiencePro()
        this.candidatService.ParExperiencePro().subscribe((data) => {
            // Convertit les données en étiquettes et valeurs
            const labels = Object.keys(data);
            const datasetData = Object.values(data);

            // Crée le deuxième graphique
            this.createSecondBarChart(labels, datasetData);
        });
    }

    private createSecondBarChart(labels: string[], data: number[]): void {
        // Détruisez le graphique existant s'il existe
        if (this.secondChart) {
            this.secondChart.destroy();
        }

        // Récupérez le `canvas` par son ID 'secondBarChart'
        const canvasElement = document.getElementById('secondBarChart') as HTMLCanvasElement;

        // Vérifiez que le `canvas` est présent dans le DOM
        if (canvasElement) {
            // Obtenez le contexte de rendu 2D
            const context = canvasElement.getContext('2d');

            // Créez le graphique Chart.js si le contexte est disponible
            if (context) {
                this.secondChart = new Chart(context, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Candidats acceptés par expérience professionnelle',
                                data,
                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1,
                                barPercentage: 0.5, // Réduit la largeur des barres
                                categoryPercentage: 0.3, // Réduit l'espacement entre les barres
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                            x: {
                                offset: true,
                            },
                        },
                        layout: {
                            padding: {
                                left: 300, // Ajustez cette valeur pour décaler le graphique
                            },
                        },
                    },
                });
            }
        }
    }
}
