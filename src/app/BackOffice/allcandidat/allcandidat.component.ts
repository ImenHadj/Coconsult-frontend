import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/FrontOffice/Candidat/candidat.model';

import { ServicecandidatService } from 'src/app/FrontOffice/servicecandidat.service';
import { DetailsrecrutementService } from '../detailsrecrutement.service';
@Component({
  selector: 'app-allcandidat',
  templateUrl: './allcandidat.component.html',
  styleUrls: ['./allcandidat.component.css'],
  providers: [ServicecandidatService]
})
export class AllcandidatComponent implements OnInit {

  candidats: Candidat[] = [];
  selectedCandidat: Candidat | null = null;
  http: any;
  selectedCandidatDetails: any; 
  
  constructor(private router: Router, private servicecandidat: ServicecandidatService) {}

  ngOnInit(): void {
    this.servicecandidat.getAllCandidats().subscribe((data: Candidat[]) => {
      this.candidats = data;
    });
  }
    
  removeCandidat(id: number): void {
    this.servicecandidat.removeCandidat(id).subscribe(() => {
      this.candidats = this.candidats.filter(candidat => candidat.idCandidat !== id);
      
    })
  }

  accepterCandidat(idCandidat: number): void {
    this.servicecandidat.accepterCandidat(idCandidat).subscribe(
      () => {
        console.log('Candidat accepté avec succès.');
      
      },
      (error: any) => {
        console.error('Erreur lors de l\'acceptation du candidat : ', error);
     
      }
    );
    
  }


  openPopup(candidat: Candidat): void {
    this.selectedCandidat = candidat;
  }

  navigateToAcceptedCandidates(): void {
    this.router.navigate(['/candidats-acceptes']);
  }


  fetchCandidats(): void {
    this.servicecandidat.getAllCandidats().subscribe((data: Candidat[]) => {
      this.candidats = data;
    });
  }
  trierParScoreDecroissant(): void {
    this.candidats.sort((a, b) => b.score - a.score);
  }

  trierParScoreCroissant(): void {
    this.candidats.sort((a, b) => a.score - b.score);
  }
  choisirOrdreTri(event: any): void {
    const ordreTri = event.target.value;
    if (ordreTri === 'croissant') {
      this.trierParScoreCroissant();
    } else if (ordreTri === 'decroissant') {
      this.trierParScoreDecroissant();
    }
  }
  
  
}