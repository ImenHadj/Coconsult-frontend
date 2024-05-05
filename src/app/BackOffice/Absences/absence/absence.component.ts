import { ServiceAbsenceService } from '../../../core/services/service-absence.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Absence } from 'src/app/core/models/absence.model';
import { Image } from 'src/app/core/models/image';
import { ImageServiceService } from 'src/app/core/services/image-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  AbsenceForm!: FormGroup;
  isEditMode: boolean = false;
  absenceId: number | null = null; 
  employeeId: number | null = null; 
  selectedFile: File  | null = null;
  uploadProgress: number | null = null;
  image: File | null = null;
  imageMin: File | null = null;
  images: Image[] = [];
  imageUrl: string | null = null;


  constructor(
    private imageService: ImageServiceService,
    private fb: FormBuilder,
    private absenceService: ServiceAbsenceService,
    private route: ActivatedRoute,  // Inject ActivatedRoute,
    private router: Router
    
    ) {}

  ngOnInit(): void {
    this.initForm(); 
    this.checkEditMode(); 
    this.getEmployee();
    this.getAbsence();
 
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
  private getAbsence():void{
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.absenceId = +id;
      }
    });
  }

  onUpload(absence:any): void {
    if (this.image) {
      this.imageService.upload(this.image,absence).subscribe(
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


  private getEmployee():void{
    this.route.params.subscribe(params => {
      const id = params['p'];
      if (id) {
        this.employeeId = +id;
      }
    });
  }
  
  private checkEditMode(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.absenceId = +id;
        this.fetchAbsenceDetails();
      }
    });
  }
  private fetchAbsenceDetails(): void {
    if (this.absenceId !== null) {
      this.absenceService.getAbsence(this.absenceId).subscribe(absence => {
        const date = new Date(absence.date);
        this.AbsenceForm.patchValue({
          motif: absence.motif,
          date: date.toISOString().split('T')[0],
          validee: absence.validee,
        });
        this.imageUrl=absence.image?.imageUrl || null;
        console.log(this.imageUrl)

      });
    }
  }
  private initForm(): void {  
    this.AbsenceForm = this.fb.group({
      motif: ['', Validators.required],
      date: ['', Validators.required],
      validee: [true, Validators.required],
   
    });}

    onSubmit(): void {
      if (this.AbsenceForm.valid) {
        const absenceData = this.AbsenceForm.value; 
        if (this.isEditMode && this.absenceId !== null) {
          this.absenceService.updateAbsence(this.absenceId,absenceData).subscribe(() => {
            console.log('Absence updated successfully');
            this.onUpload(this.absenceId);

            this.router.navigate(['admin/listAbsences']);         
          });  
        }
        else{
          if(this.employeeId!== null){
        this.absenceService.addAbsence(absenceData,this.employeeId).subscribe(
          (clientId) => {
            console.log('Absence added successfully with ID:', clientId);
            this.onUpload(clientId);
            this.router.navigate(['admin/listAbsences']);
          },
          (error) => {
            console.error('Error adding absence:', error);
          }
        );
      }
    }
    }
    }

    onCancel(): void {
      if (this.isEditMode) {
        this.router.navigate(['admin/listAbsences']);
      } else {
        this.router.navigate(['admin/listEmployees']);
      }
    }

}
