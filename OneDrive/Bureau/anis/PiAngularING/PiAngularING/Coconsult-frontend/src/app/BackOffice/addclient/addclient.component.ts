import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceclientService } from '../serviceclient.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ServiceclientService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      companyAddress: ['', Validators.required],
      // Add other form controls as needed
    });}

  onSubmit(): void {
    if (this.clientForm.valid) {
      const client = this.clientForm.value;  // No explicit type
      this.clientService.addclient(client).subscribe(
        (clientId) => {
          console.log('Client added successfully with ID:', clientId);
          window.location.reload();
        },
        (error) => {
          console.error('Error adding client:', error);
        }
      );
    }
  }
}
