import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamserviceService } from '../../teamservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../project.model';
import { ProjectServiceService } from '../../project-service.service';
import { SericeEmployeeService } from 'src/app/core/services/serice-employee.service';
import { Employee } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent {
  TeamForm!: FormGroup; 
  projects: Project[] | undefined;
  employees: Employee[] | undefined;
  selectedEmployees: Employee[] = [];
  selectedProjectId: number | undefined;
  productowners: any[] | undefined;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private teamservice: TeamserviceService,
    private router: Router, 
    private projectservice: ProjectServiceService, 
    private employeeservice: SericeEmployeeService
  ) {}
   
  ngOnInit(): void {
    this.initForm();
    this.loadEmployees();
    this.loadProjects();
    this.loadProductOwners();
  
 
  }

  private initForm(): void {
    this.TeamForm = this.fb.group({
      team_name: ['', Validators.required],
      availability: [true, Validators.required],
      nbteam: ['', Validators.required],
      project: [null, Validators.required], // Ajout d'un contrôle pour le projet
      employees: [[]], // Utilisation d'un tableau vide pour stocker les employés sélectionnés
      idprod :[''],
    });
  }

  loadProjects(): void {
    this.projectservice.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
  loadProductOwners():void{
    this.teamservice.getProductowners().subscribe((datas)=>{
      this.productowners = datas as any[];
      console.log(  this.productowners);
    });
  }


  loadEmployees(): void {
    this.employeeservice.getall().subscribe(employees => {
      this.employees = employees;
    });
  }

  onSubmit(): void {
    if (this.TeamForm && this.TeamForm.valid) {
      const formData = this.TeamForm.value;
      if (formData && formData.project ) {
        this.teamservice.addTeamAndAssignToProject(formData, formData.project,formData.idprod).subscribe(
          (result) => {
            console.log('Team added and assigned to project:', result);
            this.assignEmployeesToTeam(result.team_id, this.selectedEmployees);
            this.router.navigate([`admin/projects`]);
          },
          (error) => {
            console.error('Error adding team:', error);
          }
        );
      } else {
        console.error('Project ID and employees are required');
      }
    } else {
      console.error('Form is invalid');
    }
  }
  
  assignEmployeesToTeam(teamId: number, employees: Employee[]): void {
    this.teamservice.assignEmployeesToTeam(employees, teamId).subscribe(
      (result) => {
        console.log('Employees assigned to team:', result);
      },
      (error) => {
        console.error('Error assigning employees to team:', error);
      }
    );
  }

  //  // Méthode pour gérer la sélection/désélection des employés
  //  onEmployeeSelect(event: any): void {
  //   if (event && event.target && event.target.value && this.employees) {
  //       const selectedEmployeeIds = event.target.value;
  //       this.selectedEmployees = this.employees.filter(employee => selectedEmployeeIds.includes(employee.id_employe));
  //   }
  // }
//   onEmployeeSelect(employeeId: number): void {
//     if (this.employees) {
//         const foundEmployee = this.selectedEmployees.find(
//             (emp) => emp.id_employe === employeeId
//         );

//         if (foundEmployee) {
//             this.selectedEmployees = this.selectedEmployees.filter(
//                 (emp) => emp.id_employe !== employeeId
//             );
//         } else {
//             const employee = this.employees.find(
//                 (emp) => emp.id_employe === employeeId
//             );
//             if (employee) {
//                 this.selectedEmployees.push(employee);
//             }
//         }
//     }
// }

onEmployeeSelect(employee: Employee): void {
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
  
  onCancel(): void {
    this.router.navigate(['admin/teams']);
  }
}