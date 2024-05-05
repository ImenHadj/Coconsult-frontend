import { Component, OnInit } from '@angular/core';
import { ServicerecrutementService } from '../servicerecrutement.service';
import { Recrutement } from '../recrutement.model';
import { ActivatedRoute } from '@angular/router';
import { TypeRecrutement } from '../addrecrutement/typeRecrutement.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifier-recrutement',
  templateUrl: './modifier-recrutement.component.html',
  styleUrls: ['./modifier-recrutement.component.css']
})

export class ModifierRecrutementComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recrutementService: ServicerecrutementService
  ) {}

  idRec: number | undefined;
  recrutementForm!: FormGroup;

  typeRecrutementOptions = [TypeRecrutement.OFFRE_EMPLOI, TypeRecrutement.ETUDIANT]; 

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      this.idRec = +params['idRec']; 
    });
  }
  

  onSubmit(): void {
    if (!this.recrutementForm.valid) {
      return; 
    }
    const formData = this.recrutementForm.value;  
    this.recrutementService.updateRecrut(formData).subscribe(
      (recrutement: Recrutement) => {
        console.log('Recrutement mis à jour avec succès:', recrutement);
        window.alert('Votre mise à jour est effectuée.');
        this.recrutementForm.reset();
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du recrutement:', error);
      }
    );
  }

  private initForm(): void {
    this.recrutementForm = this.fb.group({
      poste: [''],
      lieu: ['', Validators.required],
      typeRecrutement: ['', Validators.required],
      objectifs: ['', Validators.required], 
      problematique: ['', Validators.required],
      travailDemande: ['', Validators.required],
      postesVacants: ['', Validators.required],
      experience: ['', Validators.required],
      niveauDetude: ['', Validators.required],
      salaire: ['', Validators.required],
      langue: ['', Validators.required],
      sex: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateCloture: ['', Validators.required],
      responsableRecrutement: ['', Validators.required],
      statut: ['', Validators.required],
      criteresSelection: ['', Validators.required],
      motsCles: ['', Validators.required],
    });
    console.log(JSON.stringify(this.recrutementForm.value));
  }
}
