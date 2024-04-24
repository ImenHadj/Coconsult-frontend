import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fournisseur } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-afficher-fournisseur',
  templateUrl: './afficher-fournisseur.component.html',
  styleUrls: ['./afficher-fournisseur.component.css'],
  providers:[FournisseurService]
})
export class AfficherFournisseurComponent {

  fournisseurs: any[] = [];
  p: number = 1;

  constructor(private fournisseurService:FournisseurService,
    private router: Router){}

  /*getall*/
    ngOnInit(): void {
      console.log("onit.......................");
      this.fournisseurService.getFournisseurs().subscribe((datas)=>{
        this.fournisseurs=datas as any[];
      })
    }
  
    /*remove*/
    removeFournisseur(id: number): void {
      this.fournisseurService.removeFournisseur(id).subscribe(() => {  
        this.fournisseurService.getFournisseurs().subscribe((datas) => {
          this.fournisseurs = datas as any[];
        });
      });
    }

    updateFournisseur(fournisseur: Fournisseur): void {
      this.fournisseurService.updateFournisseur(fournisseur).subscribe(
        updateFournisseur => {
          console.log('fournisseur updated successfully:', updateFournisseur);
          this.fournisseurService.getFournisseurs().subscribe((datas) => {
            this.fournisseurs = datas as any[];
          });
        },
        error => {
          console.error('Error updating fournisseur:', error);
        }
      );
    }
    
    editFournisseur(fournisseur: Fournisseur): void {
      console.log('Edit button clicked for fournisseur:', fournisseur);
      this.router.navigate(['/admin/edit-fournisseur', fournisseur.fournisseurID]);
    }

    calculerScores() {
      this.fournisseurs.forEach((fournisseur: any) => {
        this.fournisseurService.calculerScoreFournisseur(fournisseur.fournisseurID).subscribe(
          (response: any) => {
            // Mettre à jour le score du fournisseur dans la liste
            fournisseur.score = response.score;
          },
          (error: any) => {
            console.error(`Erreur lors du calcul du score pour le fournisseur ${fournisseur.fournisseurID}:`, error);
          }
        );
      });
      alert('Scores calculés avec succès pour tous les fournisseurs');
    }
}
