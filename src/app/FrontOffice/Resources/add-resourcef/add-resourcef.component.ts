import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from 'src/app/BackOffice/Resources/resources.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-resourcef',
  templateUrl: './add-resourcef.component.html',
  styleUrls: ['./add-resourcef.component.css']
})
export class AddResourcefComponent {

  resourceForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private resourceService: ResourcesService) {
    this.createForm();
  }

  createForm(): void {
    this.resourceForm = this.fb.group({
      name: ['',  [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['',  [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      price: ['', Validators.required],
      categorie: ['', Validators.required],
      file: [null, Validators.required] // Add file control
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.resourceForm.valid) {
      const formData: FormData = new FormData();
      formData.append('name', this.resourceForm.get('name')!.value);
      formData.append('description', this.resourceForm.get('description')!.value);
      formData.append('price', this.resourceForm.get('price')!.value);
      formData.append('categorie', this.resourceForm.get('categorie')!.value);
      formData.append('file', this.resourceForm.get('file')!.value);
  
      this.resourceService.addResource(formData).subscribe(
        (resourceId) => {
          console.log('Resource added successfully with ID:', resourceId);
          Swal.fire({
            text: "Resource added Successfuly",
            icon: "success"
          });


          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          console.error('Error adding resource:', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.resourceForm.get('file')!.setValue(file);
  }

  checkValidity(controlName: string): boolean {
    return (
      (this.submitted || this.resourceForm.get(controlName)!.touched) &&
      this.resourceForm.get(controlName)!.invalid
    );
  }
}
