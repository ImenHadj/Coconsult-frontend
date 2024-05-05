import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reclamation } from '../reclamation.model';
import { ReclamationService } from '../reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {

  reclamationForm!: FormGroup;

  constructor(private fb: FormBuilder, private reclamationService: ReclamationService) {
    this.createForm();
  }

  createForm(): void {
    this.reclamationForm = this.fb.group({
      employeID: ['', Validators.required],
      categorie: ['', Validators.required],
      departement: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.reclamationForm.valid) {
      const reclamationData: Reclamation = this.reclamationForm.value;
      this.reclamationService.addReclamation(reclamationData).subscribe(
        (reclamationId) => {
          console.log('Reclamation added successfully with ID:', reclamationId);
        },
        (error) => {
          console.error('Error adding reclamation:', error);
        }
      );
    }
  }
}
