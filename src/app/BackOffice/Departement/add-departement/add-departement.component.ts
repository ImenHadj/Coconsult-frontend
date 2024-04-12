import { Departement } from './../../../core/models/departement.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';
import { SericeEmployeeService } from 'src/app/core/services/serice-employee.service';
import { ServiceDepartementService } from 'src/app/core/services/service-departement.service';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css'],
})
export class AddDepartementComponent implements OnInit {
  DepartementForm!: FormGroup;
  isEditMode: boolean = false;
  departementId: number | null = null;
  employees: any[] = [];
  selectedEmployees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private departementService: ServiceDepartementService,
    private employeeService: SericeEmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.employeeService.getall().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );

    if (this.isEditMode && this.selectedEmployees.length > 0) {
      this.selectedEmployees.forEach((employee) => {
        const foundEmployee = this.employees.find(
          (emp) => emp.id_employe === employee.id_employe
        );
        if (foundEmployee) {
          foundEmployee.selected = true;
        }
      });
    }
    if (this.isEditMode && this.departementId !== null) {
      this.fetchEmployeesForDepartment(this.departementId);
    }
  }
  onCheckboxChange(employee: Employee): void {
    const foundEmployee = this.selectedEmployees.find(
      (emp) => emp.id_employe === employee.id_employe
    );

    if (foundEmployee) {
      this.selectedEmployees = this.selectedEmployees.filter(
        (emp) => emp.id_employe !== employee.id_employe
      );
    } else {
      this.selectedEmployees.push(employee);
    }
  }

  isSelected(employee: Employee): boolean {
    return this.selectedEmployees.some(
      (emp) => emp.id_employe === employee.id_employe
    );
  }

  private checkEditMode(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.departementId = +id;
        this.fetchDepartementDetails();
      }
    });
  }
  private fetchDepartementDetails(): void {
    if (this.departementId !== null) {
      this.departementService
        .getDepartement(this.departementId)
        .subscribe((conge) => {
          this.DepartementForm.patchValue({
            libelle: conge.libelle,
            maxSaturation: conge.maxSaturation,
          });

          if (conge.employees && Array.isArray(conge.employees)) {
            this.selectedEmployees = [];
            conge.employees.forEach((employee: Employee) => {
              this.selectedEmployees.push(employee);
            });
          }
        });
    }
  }

  private initForm(): void {
    this.DepartementForm = this.fb.group({
      libelle: ['', Validators.required],
      maxSaturation: ['', Validators.required],
      employees: [[]], 
    });
  }
  
  fetchEmployeesForDepartment(departmentId: number): void {
    this.departementService.retrieveEmployeesByDepartement(departmentId).subscribe(
      (employees: Employee[]) => {
        this.selectedEmployees = employees;
        this.employees.forEach((employee) => {
          employee.selected = this.isSelected(employee);
        });
      },
      (error) => {
        console.error('Error fetching employees for department:', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.DepartementForm.valid) {
      const CongeData = this.DepartementForm.value;
      if (this.isEditMode && this.departementId !== null) {
        this.departementService
          .updateDepartement(this.departementId, CongeData)
          .subscribe(() => {
            console.log('departement updated successfully');
            // console.log('Request payload:', CongeData); 


            if (this.departementId !== null) {
              // console.log('this isssssss');
              this.departementService
                .affecterEmplADep(this.departementId, this.selectedEmployees)
                .subscribe(
                  () => {
                    console.log(
                      'Employees associated with the department successfully'
                    );
                    this.router.navigate(['admin/listDepartments']);
                  },
                  (error) => {
                    console.error(
                      'Error associating employees with the department:',
                      error
                    );
                    // console.log('Request payload:', CongeData); 

                  }
                );
            } else {
              console.error('Received null clientId from the server');
              // console.log('Request payload:', CongeData);

            }
          });
      } else {
        this.departementService.addDepartement(CongeData).subscribe(
          (id_departement: number) => {
            // console.log(
            //   'departement added successfully with ID:',
            //   id_departement
            // );
            if (id_departement !== null) {
              console.log('this isssssss');
              this.departementService
                .affecterEmplADep(id_departement, this.selectedEmployees)
                .subscribe(
                  () => {
                    console.log(
                      'Employees associated with the department successfully'
                    );
                    this.router.navigate(['admin/listDepartments']);
                  },
                  (error) => {
                    console.error(
                      'Error associating employees with the department:',
                      error
                    );
                  }
                );
            } else {
              console.error('Received null clientId from the server');
            }
          },
          (error) => {
            console.error('Error adding departement:', error);
          }
        );
      }
    }
  }
 
  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['admin/listDepartments']);
    } else {
      this.router.navigate(['admin/listDepartments']);
    }
  }
}
