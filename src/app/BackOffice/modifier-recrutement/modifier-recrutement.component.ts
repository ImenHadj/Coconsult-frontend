import { Component, OnInit } from '@angular/core';
import { ServicerecrutementService } from '../servicerecrutement.service';
import { Recrutement } from '../recrutement.model';
import { ActivatedRoute, Route } from '@angular/router';
import { TypeRecrutement } from '../addrecrutement/typeRecrutement.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-recrutement',
  templateUrl: './modifier-recrutement.component.html',
  styleUrls: ['./modifier-recrutement.component.css']
})

export class ModifierRecrutementComponent implements OnInit {
 constructor(private route: ActivatedRoute,private fb: FormBuilder, private recrutementservice:ServicerecrutementService){}

  idRec: number | undefined ;
  recrutementForm!: FormGroup;

 typeRecrutementOptions = [TypeRecrutement.OFFRE_EMPLOI, TypeRecrutement.ETUDIANT]; 

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      this.idRec = +params['id'];
      
    });
  } 
onSubmit(): void {
  if (!this.recrutementForm.valid) {
    return; 
  }
  const formData = this.recrutementForm.value;  
  this.recrutementservice.updateRecrut(formData).subscribe(
    (candidat: any) => {
      console.log('candidat added successfully with ID:', candidat);
      window.alert('ur update is done ');
      this.recrutementForm.reset();
    },
    (error: any) => {
      console.error('Error adding candidat:', error);
    })
  }

  private initForm(): void {
    this.recrutementForm = this.fb.group({
      poste: [''],
      lieu: ['', Validators.required],
      typeRecrutement: ['',Validators.required],
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