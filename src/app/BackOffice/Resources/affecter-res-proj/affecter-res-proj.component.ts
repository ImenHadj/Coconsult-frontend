
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectServiceService } from '../../project-service.service';
import { ResourcesService } from '../resources.service';


@Component({
  selector: 'app-affecter-res-proj',
  templateUrl: './affecter-res-proj.component.html',
  styleUrls: ['./affecter-res-proj.component.css']
})
export class AffecterResProjComponent {

  projects: any[] = [];
  resources: any[] = [];
  selectedProject: any | null = null;
  resourceForm: FormGroup;
  showSuccessMessage: boolean = false;

  constructor(
    private resourceService: ResourcesService,
    private formBuilder: FormBuilder,
    private projetservice: ProjectServiceService
  ) {
    this.resourceForm = this.formBuilder.group({
      resources: this.formBuilder.array([])
    });
    this.loadProjects();
    this.loadResources();
  }

  loadProjects() {
    this.projetservice.getAllProjects()?.subscribe((projects: any) => {
        this.projects = projects || [];
        console.log('Projects:', this.projects); // Ajouter ce log pour vérifier les données récupérées
    });
}


  loadResources() {
    this.resourceService.getResources()?.subscribe((resources: any) => {
      this.resources = resources || [];
    });
  }

  affectResourcesToProject() {
    const projectId = this.selectedProject?.projectid;
    console.log('Project ID:', projectId);

    const resourceQuantities = this.resourceForm.value.resources.map((item: any) => {
        return { resourceId: item.resource, quantity: item.quantity };
    });
    console.log('Resource Quantities:', resourceQuantities);
  
    if (projectId) {
        const formData = {
            projectId: projectId,
            resourceQuantities: resourceQuantities
        };
        console.log('Form Data:', formData);
  
        this.resourceService.affectResources(formData)
            .subscribe((response: any) => {
                console.log('Response from server:', response);
                console.log('Resources affected to project successfully.');
                this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 6000); // Masquer le message après 2 secondes
        setTimeout(() => {
          window.location.reload();
        }, 1000);
                this.resourceForm.reset();
                this.loadProjects();
            }, (error: any) => {
                console.error('Error while affecting resources to project:', error);
            });
    }
}

  
  
  
  

  onSelectProject(project: any) {
    this.selectedProject = project;
  }

  onDeselectProject() {
    this.selectedProject = null;
  }

  addResourceField() {
    const resourceField = this.formBuilder.group({
      resource: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.resourceFields.push(resourceField);
  }

  removeResourceField(index: number) {
    this.resourceFields.removeAt(index);
  }

  get resourceFields() {
    return this.resourceForm.get('resources') as FormArray;
  }
}
