import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailsrecrutementService } from '../detailsrecrutement.service';
import { Candidat } from 'src/app/FrontOffice/Candidat/candidat.model';


@Component({
  selector: 'app-details-recrutement-modal',
  templateUrl: './details-recrutement-modal.component.html',
  styleUrls: ['./details-recrutement-modal.component.css']
})
export class DetailsRecrutementModalComponent {
  
  dateEntretien: string = '';
  evaluateur: string | undefined;
  commentairesEvaluateur: string | undefined;
  candidatsAcceptes: Candidat[] = [];
  candidat: Candidat | undefined;


  constructor(public dialogRef: MatDialogRef<DetailsRecrutementModalComponent>,
              private detailsRecrutementService: DetailsrecrutementService,
          
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.candidat = data.candidat;
                this.dateEntretien = data.dateEntretien;
              }
       
              onCancelClick(): void {
                this.dialogRef.close();
              }
            
          
              onSubmitClick(): void {
                if (this.candidat && this.candidat.idCandidat && this.dateEntretien) {
                  const candidatId = this.candidat.idCandidat;
                  this.detailsRecrutementService.proposerDateEntretien(candidatId, this.dateEntretien).subscribe(
                    () => {
                      console.log('Proposition de date d\'entretien envoyée avec succès');
                      this.dialogRef.close();
                    },
                    (error) => {
                      console.error('Erreur lors de la proposition de date d\'entretien : ', error);
                      // Gérer l'erreur
                    }
                  );
                } else {
                  console.error('Veuillez sélectionner un candidat et saisir une date d\'entretien valide');
                  // Gérer le cas où aucune date n'est saisie ou candidat invalide
                }
              }  
            }
          