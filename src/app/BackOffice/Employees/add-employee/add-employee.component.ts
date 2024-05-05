import { Departement } from './../../../core/models/departement.model';
import { Employee, PosteEmployee } from './../../../core/models/employee.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SericeEmployeeService } from '../../../core/services/serice-employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDepartementService } from 'src/app/core/services/service-departement.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  EmployeeForm!: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;
  Departements: Departement[] = [];
  selectedDepartement: any;
  selectedTeam:any;

  constructor(
    private fb: FormBuilder,
    private employeeService: SericeEmployeeService,
    private departmentService: ServiceDepartementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  
    this.departmentService.getall().subscribe(
      (data: Departement[]) => {
        this.Departements = data;
        if (this.isEditMode) {
          this.fetchEmployeeDetails();
        }
      },
      (error) => {
        console.error('Erreur fetching');
      }
    );
  
    // Subscribe to value changes of the form
    this.EmployeeForm.valueChanges.subscribe(() => {
      this.selectedDepartement = this.EmployeeForm.get('selectedDepartement')?.value;
    });
  }
  
  changeDepartments(event: any): void {
    if (event.target.value) {
      this.selectedDepartement = event.target.value;
    }
  }

  postes = Object.values(PosteEmployee)
    .filter((value) => typeof value === 'string')
    .sort();

  private checkEditMode(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.fetchEmployeeDetails();
      }
    });
  }

  private fetchEmployeeDetails(): void {
    if (this.employeeId !== null) {
      this.employeeService
        .getEmployee(this.employeeId)
        .subscribe((employee) => {
          const date = new Date(employee.date_embauche);
          this.EmployeeForm.patchValue({
            date_embauche: date.toISOString().split('T')[0],
            posteEmployee: employee.posteEmployee,
            selectedDepartement: employee.departement.id_departement, // Set the value of the form control directly
          });
        });
    }
  }

  private initForm(): void {
    this.EmployeeForm = this.fb.group({
      date_embauche: ['', Validators.required],
      posteEmployee: ['', Validators.required],
      selectedDepartement: [null, Validators.required], // Define the selectedDepartement control
      departements: this.fb.array([]),
       selectedTeam: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.EmployeeForm.valid) {
      const employeeData = this.EmployeeForm.value;
      if (this.isEditMode && this.employeeId !== null) {
        this.employeeService
          .updateEmployee(
            this.employeeId,
            employeeData,
            this.selectedDepartement,
            this.selectedTeam
          )
          .subscribe(
            () => {
              console.log('Employee updated successfully');
              this.router.navigate(['admin/listEmployees']);
            },
            (error) => {
              console.error('Error adding conge:', error);
              console.log('Error details:', error.error); // Log the complete error response
              console.log('Request payload:', employeeData); // Log the request payload
              console.log(
                'this.selectedDepartement :',
                this.selectedDepartement
              ); // Log the request payload
              // window.location.reload();
            }
          );
      } else {
        this.employeeService
          .addEmployee(employeeData, this.selectedDepartement)
          .subscribe(
            (clientId) => {
              console.log('Employee added successfully with ID:', clientId);
              // window.location.reload();
              this.router.navigate(['admin/listEmployees']);

              // console.log('Request payload:', employeeData); // Log the request payload
              // console.log('edit mode :', this.isEditMode); // Log the request payload
            },
            (error) => {
              console.error('Error adding employee:', error);
              // window.location.reload();
            }
          );
      }
    }
  }

  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['admin/listEmployees']);
    } else {
      this.router.navigate(['admin/listEmployees']);
    }
  }
}
