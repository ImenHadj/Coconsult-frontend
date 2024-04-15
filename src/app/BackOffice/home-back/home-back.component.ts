import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../Fournisseur/fournisseur.model';
import { FournisseurService } from '../Fournisseur/fournisseur.service';


@Component({
  selector: 'app-home-back',
  templateUrl: './home-back.component.html',
  styleUrls: ['./home-back.component.css']
})
export class HomeBackComponent implements OnInit {

  topThreeFournisseurs: Fournisseur[] = [];

  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    this.fournisseurService.getTopThreeFournisseursWithStocks().subscribe(
      (fournisseurs: Fournisseur[]) => {
        this.topThreeFournisseurs = fournisseurs;
        // Pour chaque fournisseur, récupérez le nombre de stocks associés
        this.topThreeFournisseurs.forEach((fournisseur: Fournisseur) => {
          // Vérifier si l'ID du fournisseur est défini
          if (fournisseur.fournisseurID !== undefined) {
            this.fournisseurService.getNombreStocksFournisseur(fournisseur.fournisseurID).subscribe(
              (nbStocks: number) => {
                // Mettre à jour le nombre de stocks associés au fournisseur
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
  }
}
