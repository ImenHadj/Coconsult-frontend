import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratEmployee, ContratEmployeeType } from 'src/app/core/models/contratEmployee.model';
import { ServiceContratEmplService } from 'src/app/core/services/service-contrat-empl.service';

@Component({
  selector: 'app-add-contrat-employe',
  templateUrl: './add-contrat-employe.component.html',
  styleUrls: ['./add-contrat-employe.component.css']
})
export class AddContratEmployeComponent implements OnInit {
  ContratEmployeeForm!: FormGroup;
  isEditMode: boolean = false;
  ContratId: number | null = null;
  employeeId: number | null = null;
  postes = Object.values(ContratEmployeeType)
    .filter((value) => typeof value === 'string')
    .sort();
  errorMessage: string = '';
  userFile:any;
  imgURL:any;
public imagePath:any;

  constructor(private fb: FormBuilder,
    private congeService: ServiceContratEmplService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getEmployee();

  }
  private getEmployee(): void {
    this.route.params.subscribe((params) => {
      const id = params['p'];
      if (id) {
        this.employeeId = +id;
      }
    });
  }
  private checkEditMode(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.ContratId = +id;
        this.fetchContratDetails();
      }
    });
  }
  private fetchContratDetails(): void {
    if (this.ContratId !== null) {
      this.congeService.getContratEmployee(this.ContratId).subscribe((conge) => {
        // console.log('Conge object:', conge);

        // console.log('Conge typeC:', conge.typeCE);

        const dateD = new Date(conge.date_debut);
        const dateF = new Date(conge.date_fin);

        this.ContratEmployeeForm.patchValue({
          date_debut: dateD.toISOString().split('T')[0],
          date_fin: dateF.toISOString().split('T')[0],
          duree_hebdomadaire: conge.duree_hebdomadaire,
          isArchive: conge.isArchive,
          numeroSecuriteSociale: conge.numeroSecuriteSociale,
          rib: conge.rib,
          typeCE: conge.typeCE,     
          salaire_base: conge.salaire_base,     
          montant_heures_supplementaires: conge.montant_heures_supplementaires,     
          montant_Conge_Absence: conge.montant_Conge_Absence,     
        });
      });
    }
  }

  initForm(): void {
    this.ContratEmployeeForm = this.fb.group({
      rib: ['', Validators.required],
      numeroSecuriteSociale: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      typeCE: ['', Validators.required],
      duree_hebdomadaire: ['', Validators.required],
      isArchive: [false],
      salaire_base: ['', Validators.required],
      montant_heures_supplementaires: ['', Validators.required],
      montant_Conge_Absence: ['', Validators.required],

    });
  }

  onSubmit(): void {
    if (this.ContratEmployeeForm.valid) {
      const contratEmployeeData: ContratEmployee = this.ContratEmployeeForm.value;
      if (this.isEditMode && this.ContratId !== null) {
        this.congeService.updateContratEmployee(contratEmployeeData,this.ContratId ).subscribe(() => {
          this.generatePDF(contratEmployeeData);
          console.log('Contract updated successfully');
          this.router.navigate(['admin/ListContratEmployee']);
        },
        (errorResponse) => {
          if (errorResponse.error && errorResponse.error.error) {
            this.errorMessage = errorResponse.error.error;
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
        );
      } else {
        if (this.employeeId !== null) {
          this.congeService.saveContratEmployee(contratEmployeeData, this.employeeId).subscribe(
            (clientId) => {
              // console.log('Conge added successfully with ID:', clientId);
              this.generatePDF(contratEmployeeData);
              this.router.navigate(['admin/ListContratEmployee']);
            },
            (errorResponse) => {
             if (errorResponse.error && errorResponse.error.error) {
                this.errorMessage = errorResponse.error.error;
                // console.log(errorResponse.error.error)
                // console.log(contratEmployeeData)

              } else {
                this.errorMessage = 'An unexpected error occurred.';
              }
            }
          );
        }
      }
    }
  }



  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['admin/ListContratEmployee']);
    } else {
      this.router.navigate(['admin/listEmployees']);
    }
  }


  generatePDF(contrat: ContratEmployee): void {
    this.congeService.generatePDF(contrat).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Error generating PDF:', error);
      }
    );
  }
}
