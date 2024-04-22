import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/FrontOffice/Candidat/candidat.model';
import { ServicecandidatService } from 'src/app/FrontOffice/servicecandidat.service';
import { DetailsrecrutementService } from '../detailsrecrutement.service';

import { MatDialog } from '@angular/material/dialog';
import { DetailsRecrutementModalComponent } from '../details-recrutement-modal/details-recrutement-modal.component';

@Component({
  selector: 'app-candidatsacceptes',
  templateUrl: './candidatsacceptes.component.html',
  styleUrls: ['./candidatsacceptes.component.css']
})


export class CandidatsacceptesComponent  implements OnInit {
 
  candidatsAcceptes: Candidat[] = [];
  dateEntretien!: string;
  showPropositionForm: boolean = false; 
  
  constructor(private servicecandidat: ServicecandidatService, 
    private detailsrecrutementService: DetailsrecrutementService,
    private dialog: MatDialog  ) { }
 
    
  ngOnInit(): void {
    this.servicecandidat.getCandidatsAcceptes().subscribe((data: Candidat[]) => {
      this.candidatsAcceptes = data;
    });
  }

  submitPropositionDateEntretien(): void {
       const propositionDateEntretienData = {
      dateEntretien: this.dateEntretien,
    };
  }
  /*
  proposerDateEntretien(candidat: Candidat): void {
    this.showPropositionForm = true;
    this.detailsrecrutementService.proposerDateEntretien(candidat.idCandidat).subscribe(
      () => {
        console.log('Proposition de date dentretien envoyée avec succès');
    
      },
      (error) => {
        console.error('Erreur lors de la proposition de date d\'entretien : ', error);
      
      }
    );
  } */

  proposerDateEntretien(candidat: Candidat): void {
    const dialogRef = this.dialog.open(DetailsRecrutementModalComponent, {
      panelClass: 'custom-dialog', // Utiliser la classe CSS définie pour le style de la boîte de dialogue
      data: { candidat: candidat }
    });
    
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.dateEntretien) {
        // Si l'utilisateur a saisi une date d'entretien, appelez le service pour effectuer la proposition
        this.detailsrecrutementService.proposerDateEntretien(candidat.idCandidat, result.dateEntretien).subscribe(
          () => {
            console.log('Proposition de date d\'entretien envoyée avec succès');
            // Mettre à jour les données si nécessaire
          },
          (error) => {
            console.error('Erreur lors de la proposition de date d\'entretien : ', error);
            // Gérer l'erreur
          }
        );
      }
    });
  }
}