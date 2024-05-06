import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { CommandeService } from 'src/app/BackOffice/commande/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
  providers:[CommandeService]
})
export class CommandeComponent {
  commandes: any[] = [];
  totalCommandCount: number = 0;
  arrivedAndCanceledCount: number = 0;
  progressPercentage: number = 0;
  p: number = 1;

  constructor(private commandeservice: CommandeService, private router: Router) { }

  /*getall*/
  ngOnInit(): void {
    console.log("onit.......................");
    this.commandeservice.getCommandes().subscribe((datas) => {
      this.commandes = datas as any[];
      this.totalCommandCount = this.commandes.length;
      this.arrivedAndCanceledCount = this.commandes.filter(commande => 
        commande.statusCommande === 'ARRIVED' || commande.statusCommande === 'CANCELED'
      ).length;
      this.calculateProgressPercentage();
    });
  }

  /*remove*/
  removeCommande(id: number): void {
    this.commandeservice.removeCommande(id).subscribe(() => {
      this.commandeservice.getCommandes().subscribe((datas) => {
        this.commandes = datas as any[];
        this.updateCounts();
      });
    });
  }

  marquerCommandeCommeArrivee(id: number): void {
    this.commandeservice.marquerCommandeCommeArrivee(id).subscribe(() => {
      this.commandeservice.getCommandes().subscribe((datas) => {
        this.commandes = datas as any[];
        this.updateCounts();
      });
    });
  }

  private updateCounts(): void {
    this.totalCommandCount = this.commandes.length;
    this.arrivedAndCanceledCount = this.commandes.filter(commande => 
      commande.statusCommande === 'ARRIVED' || commande.statusCommande === 'CANCELED'
    ).length;
    this.calculateProgressPercentage();
  }

  private calculateProgressPercentage(): void {
    this.progressPercentage = (this.arrivedAndCanceledCount / this.totalCommandCount) * 100;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const progressBar = document.querySelector('.progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.classList.remove('initial-progress');
      }
    }, 100);
  }
  
}
