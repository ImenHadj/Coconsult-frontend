import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantserviceService } from '../consultantservice.service';
import { ProjectServiceService } from '../project-service.service';

@Component({
  selector: 'app-addconsultant',
  templateUrl: './addconsultant.component.html',
  styleUrls: ['./addconsultant.component.css']
})
export class AddconsultantComponent implements OnInit{
  consultantForm!: FormGroup;
  projects: any[] =[]; 
 

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private consultantService: ConsultantserviceService ,private projectService: ProjectServiceService ) {}


  ngOnInit(): void {
    this.initForm();
    this.loadProjects();


} loadProjects(): void {
  this.projectService.getAllProjects().subscribe(projects => {
    this.projects = projects;
  });
}

  initForm() {
    this.consultantForm = this.fb.group({
      name: ['', Validators.required],
      skills: ['', Validators.required],
      availability: [true, Validators.required],
      hourlyRate:[0, Validators.required],
      hoursWorked:[0, Validators.required],
      projectIds: [] // Champ pour sélectionner les projets
    });
  }



  onSubmit(): void {
    if (this.consultantForm && this.consultantForm.valid) {
      const formData = this.consultantForm.value;
      const projectIds: any[] = formData.projectIds;
  
  
      this.consultantService.addAndAssignConsultantToProjects(formData, projectIds).subscribe(
        result => {
          console.log('Consultant added and assigned to projects:', result);
        },
        error => {
          console.error('Error adding consultant:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
}
}