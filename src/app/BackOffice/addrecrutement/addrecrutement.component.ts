import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ServicerecrutementService  } from '../servicerecrutement.service';
import { TypeRecrutement } from '../addrecrutement/typeRecrutement.enum'


@Component({
  selector: 'app-addrecrutement',
  templateUrl: './addrecrutement.component.html',
  styleUrls: ['./addrecrutement.component.css']
})
export class AddrecrutementComponent  implements OnInit {
recrutementForm!: FormGroup; 
TypeRecrutement: any;
typeRecrutementEnum = TypeRecrutement;
  constructor(private formBuilder: FormBuilder, private ServicerecrutementService: ServicerecrutementService) { }

  ngOnInit(): void {
 
   this.initForm();
   this.TypeRecrutement = Object.values(TypeRecrutement);
  }

  initForm(): void {
    this.recrutementForm = this.formBuilder.group({
      poste: ['', Validators.required],
      lieu: ['', Validators.required],
      postesVacants: ['', Validators.required],
      typeRecrutement: [null, Validators.required],
      //image: [''], 
      objectifs: [''],
      problematique: [''],
      travailDemande: [''],
      experience: ['', Validators.required],
      niveauDetude: [''],
      salaire: [null, Validators.required],
      langue: [''],
      sex: [''],
      description: [''],
      dateDebut: [''],
      dateCloture: [''],
      responsableRecrutement: [''],
      statut: [''],
      criteresSelection: [''],
      motsCles: ['']

    });
  }

  addRecrutement(): void {
    if (this.recrutementForm.invalid) {
      return; 
    }

    const formData = this.recrutementForm.value;
    this.ServicerecrutementService.addRecrutement(formData).subscribe(
      (recrutement: any) => {
        console.log('Recrutement ajouté avec succès !', recrutement);
        this.recrutementForm.reset();
      },
      (error: any) => {
        console.error('Erreur lors de lajout du recrutement : ', error);
       
      }
      
    );
    
    
  }
}
