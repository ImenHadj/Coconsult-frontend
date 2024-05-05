import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recrutement } from 'src/app/BackOffice/recrutement.model';
import { ServicerecrutementService } from 'src/app/BackOffice/servicerecrutement.service';

@Component({
  selector: 'app-description-postes',
  templateUrl: './description-postes.component.html',
  styleUrls: ['./description-postes.component.css']
})
export class DescriptionPostesComponent implements OnInit {
  recrutement: Recrutement | null = null;
  searchText: string = ''; 
    idRecrutement: number | undefined;
  constructor(
      private route: ActivatedRoute,
      private recrutementService: ServicerecrutementService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.idRecrutement = +params['idRec']; 
        console.log('ID de recrutement récupéré:', this.idRecrutement);

        if (this.idRecrutement) {
            // Appelez le service pour obtenir les détails du recrutement
            this.recrutementService.getRecruttById(this.idRecrutement).subscribe(
                (recrutement) => {
                    console.log('Recrutement reçu:', recrutement);
                    this.recrutement = recrutement;
                },
                
            );
        } 
    });
}

}