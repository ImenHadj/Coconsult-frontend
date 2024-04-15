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
      nom: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      typeFournisseur: ['', Validators.required]
      
    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const stockData: Fournisseur = this.fournisseurForm.value;
      this.fournisseurService.addFournisseur(stockData).subscribe(
        (stockId) => {
          console.log('fournisseur added successfully with ID:', stockId);
          
        },
        (error) => {
          console.error('Error adding fournisseur:', error);
        }
      );
    }
  }

}
