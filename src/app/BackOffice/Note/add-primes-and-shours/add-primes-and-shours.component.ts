import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceSalaireService } from 'src/app/core/services/service-salaire.service';

@Component({
  selector: 'app-add-primes-and-shours',
  templateUrl: './add-primes-and-shours.component.html',
  styleUrls: ['./add-primes-and-shours.component.css']
})
export class AddPrimesAndSHoursComponent implements OnInit {
  SalaireForm!: FormGroup;
  primes: any;
  supplementHours: any;
  employeeId: number | null = null;
  errorMessage: string = '';


  constructor(private fb: FormBuilder,
    private SalaireService: ServiceSalaireService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getEmployee();
    this.initForm();
  }

  private getEmployee(): void {
    this.route.params.subscribe((params) => {
      const id = params['p'];
      if (id) {
        this.employeeId = +id;
      }
    });
  }

  private initForm(): void {
    this.SalaireForm = this.fb.group({
      prime: ['', Validators.required],
      heures_supplementaires: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.SalaireForm.valid) {
      const CongeData = this.SalaireForm.value;
        if (this.employeeId !== null) {
          this.SalaireService.addSalaire(this.employeeId, CongeData).subscribe(
            (id_note) => {
              console.log('Salaire added successfully with ID:', id_note);
              this.router.navigate(['admin/listEmployees']);
            },
            (errorResponse) => {
              if (errorResponse.error && errorResponse.error.error) {
                this.errorMessage = errorResponse.error.error;
              } else {
                this.errorMessage = 'An unexpected error occurred.';
              }
            }
          ); 
      }
    }
  }

  onCancel(): void {
   
      this.router.navigate(['admin/listEmployees']);
    }
  
}
