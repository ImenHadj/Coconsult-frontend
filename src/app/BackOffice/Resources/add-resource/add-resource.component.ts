import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resources } from '../resources.model';
import { ResourcesService } from '../resources.service';


@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent {
  resourceForm!: FormGroup;

  constructor(private fb: FormBuilder, private resourceService: ResourcesService) {
    this.createForm();
  }

  createForm(): void {
    this.resourceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      categorie: ['', Validators.required],
      
    });
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      const resourceData: Resources = this.resourceForm.value;
      this.resourceService.addResource(resourceData).subscribe(
        (resourceId) => {
          console.log('Resource added successfully with ID:', resourceId);
          
        },
        (error) => {
          console.error('Error adding resource:', error);
        }
      );
    }
  }
}
