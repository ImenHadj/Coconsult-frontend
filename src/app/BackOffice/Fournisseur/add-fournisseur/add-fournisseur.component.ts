import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent {

  fournisseurForm!: FormGroup;

  constructor(private fb: FormBuilder, private fournisseurService: FournisseurService) {
    this.createForm();
  }

  createForm(): void {
    this.fournisseurForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      address: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      typeFournisseur: ['', Validators.required]    
    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const fournisseurData: Fournisseur = this.fournisseurForm.value;
      this.fournisseurService.addFournisseur(fournisseurData).subscribe(
        (fournisseurId) => {
          console.log('Fournisseur added successfully with ID:', fournisseurId);          
        },
        (error) => {
          console.error('Error adding fournisseur:', error);
        }
      );
    } else {
      this.fournisseurForm.markAllAsTouched();
    }
  }
}
