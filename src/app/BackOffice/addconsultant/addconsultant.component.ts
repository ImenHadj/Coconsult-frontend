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
onCancel() {
  this.router.navigate(['admin/projects']);  
}
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
      projectId: ['', Validators.required] // Champ pour sélectionner les projets
    });
  }



  onSubmit(): void {
      if (this.consultantForm) {
        // Vérifier si le formulaire est valide
        if (this.consultantForm.valid) {
          // Récupérer les données du formulaire
          const formData = this.consultantForm.value;
          // Vérifier si formData et formData.projectId sont définis
          if (formData && formData.projectId) {
            // Appeler le service pour ajouter la tâche et l'associer au projet
            this.consultantService.addConsultantAndAssignToProject(formData.projectId, formData).subscribe(result => {
              console.log('consultant added and assigned to project:', result);
            },
            
            error => {
              console.error('Error adding task:', error);
            });
            this.router.navigate(['admin/projects']);  
          }
    
        } else {
          console.error('Form is invalid');
        }
      } else {
        console.error('Form is not initialized');
      }
    }
  
  
  
}