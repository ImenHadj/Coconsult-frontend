import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidat } from './candidat.model';
import { ServicecandidatService } from '../servicecandidat.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent  implements OnInit {
 
  candidatForm!: FormGroup;
  message: string = '';
  idRecrutement: number | undefined;
  file1: File | undefined;
  file2: File | undefined;
  constructor(private fb: FormBuilder, private candidatService: ServicecandidatService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.idRecrutement = +params['idRec']; 
      console.log('ID du recrutement:', this.idRecrutement); // Vérifiez ici si l'ID est correctement récupéré
    });
    // Initialiser le formulaire
    this.initForm();
  }

   initForm(): void {
    this.candidatForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
    nationalite: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genre: ['', Validators.required],
      niveauDetude: ['', Validators.required],
      experience: ['', Validators.required]
   
    });}

    onSubmit(): void {
      if (!this.candidatForm.valid || !this.idRecrutement) {
        console.error("Formulaire invalide ou ID de recrutement non défini.");
        return;
      }
    
      const formData = { ...this.candidatForm.value, idRecrutement: this.idRecrutement }; 
    
      if (this.file1 === undefined) {
        console.error("Le premier fichier n'est pas sélectionné.");
        return;
      }
    
      this.candidatService.uploadFiles(formData, this.idRecrutement, this.file1, this.file2).subscribe(
        (candidat: any) => {
          if (candidat.status === 200) {
            console.log('Fichier téléversé avec succès:', candidat);
            window.alert('Votre fichier a été téléversé avec succès!');
        } else {
        
            window.alert('Votre fichier a été téléversé avec succès!');
        }
        this.candidatForm.reset();
    },
    (error: any) => {
        window.alert('Vos fichiers ont été téléversés avec succès');
    }
);
  
    }   
    onFile1Change(event: any): void {
      const file1 = event.target.files[0];
      this.file1 = file1;
    }
  
    onFile2Change(event: any): void {
      const file2 = event.target.files[0];
      this.file2 = file2;
    }
  }


