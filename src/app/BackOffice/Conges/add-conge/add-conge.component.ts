import { StatutC } from './../../../core/models/conge.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { typeC } from 'src/app/core/models/conge.model';
import { Image } from 'src/app/core/models/image';
import { ImageServiceService } from 'src/app/core/services/image-service.service';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.css'],
})
export class AddCongeComponent implements OnInit {

  CongeForm!: FormGroup;
  isEditMode: boolean = false;
  congeId: number | null = null;
  employeeId: number | null = null;
  errorMessage: string = '';
  selectedFile: File  | null = null;
  uploadProgress: number | null = null;
  image: File | null = null;
  imageMin: File | null = null;
  images: Image[] = [];
  imageUrl: string | null = null;
  statusChanged: boolean = false;

private changeMe(): void {
  this.CongeForm.get('statutC')?.valueChanges.subscribe((value) => {
    if (value && value !== 'PENDING') { // Check if the value is not 'PENDING'
      this.statusChanged = true;
    } else {
      this.statusChanged = false;
    }
  });
}

  postes = Object.values(typeC)
    .filter((value) => typeof value === 'string')
    .sort();
  status = Object.values(StatutC)
    .filter((value) => typeof value === 'string')
    .sort();

  constructor(
    private fb: FormBuilder,
    private congeService: ServiceCongeService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageServiceService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getEmployee();
    this.changeMe();
  }

   ClickEmail(): any{
    if (this.employeeId !== null && this.CongeForm.valid) {
   this.congeService.SendEmailConge(this.employeeId,this.CongeForm.value).subscribe((id)=>{
    console.log(id);
   })
  }
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
        this.congeId = +id;
        this.fetchCongeDetails();
      }
    });
  }

  private fetchCongeDetails(): void {
    if (this.congeId !== null) {
      this.congeService.getConge(this.congeId).subscribe((conge) => {
        const dateD = new Date(conge.date_debut);
        const dateF = new Date(conge.date_fin);

        this.CongeForm.patchValue({
          date_debut: dateD.toISOString().split('T')[0],
          date_fin: dateF.toISOString().split('T')[0],
          typeC: conge.typeC,
          statutC: conge.statutC,
          commentaire: conge.commentaire,
        });
        this.imageUrl=conge.image?.imageUrl || null;
        console.log(this.imageUrl)

      });
    }
  }

  private initForm(): void {
    this.CongeForm = this.fb.group({
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      typeC: ['', Validators.required],
      statutC: [StatutC.PENDING, this.isEditMode ? Validators.required : null],
      commentaire: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.CongeForm.valid) {
      const CongeData = this.CongeForm.value;
      if (this.isEditMode && this.congeId !== null) {
       const sendEmailAutomatically = (document.getElementById('sendEmailAutomatically') as HTMLInputElement)?.checked;
        this.congeService.updateConge(this.congeId, CongeData).subscribe(() => {
          if (sendEmailAutomatically) {
            this.ClickEmail();
          }
          this.onUpload(this.congeId);
          this.router.navigate(['admin/listConge']);
        }
        ,
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
          this.congeService.addConge(CongeData, this.employeeId).subscribe(
            (clientId) => {
              console.log('Conge added successfully with ID:', clientId);
              this.onUpload(clientId);
              this.router.navigate(['admin/listConge']);
            }
            ,
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
  }

  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['admin/listConge']);
    } else {
      this.router.navigate(['admin/listEmployees']);
    }
  }


  onFileChange(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
  }


  onUpload(absence:any): void {
    if (this.image) {
      this.imageService.uploadJustifConge(this.image,absence).subscribe(
        data => {
          this.fetchImages();
        },
        err => {
          this.reset();
        }
      );
    }
  }

  reset(): void {
    this.image = null;
    this.imageMin = null;
    const imageInputFile = document.getElementById('image') as HTMLInputElement;
    if (imageInputFile) {
      imageInputFile.value = '';
    }
  }

  fetchImages(): void {
    this.imageService.list().subscribe(
      (images) => {
        this.images = images;
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }
  

}