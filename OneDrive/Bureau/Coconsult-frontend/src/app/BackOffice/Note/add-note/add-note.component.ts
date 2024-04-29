import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { critereNote } from 'src/app/core/models/note.model';
import { ServiceNoteService } from 'src/app/core/services/service-note.service';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  NoteForm!: FormGroup;
  isEditMode: boolean = false;
  NoteId: number | null = null;  
  employeeId: number | null = null; 
  ratingCount=0;
  totalRating=0;
  finalRating:any;
  ratingControl=new FormControl(0);
  // GetRating(){
  //   this.ratingCount++;
  //   this.totalRating+=this.ratingControl?.value ||0;
  //   this.finalRating=(this.totalRating/this.ratingCount).toFixed(2);
  // }


  postes = Object.values(critereNote)
    .filter((value) => typeof value === 'string')
    .sort();



  constructor(private fb: FormBuilder,
    private NoteService: ServiceNoteService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

    ngOnInit(): void {
      this.initForm(); 
      this.checkEditMode();  
      this.getEmployee();

      
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
          this.NoteId = +id;
          this.fetchDepartementDetails();
        }
      });
    }
    private fetchDepartementDetails(): void {
      if (this.NoteId !== null) {
        this.NoteService.getNote(this.NoteId).subscribe((conge) => {
          this.NoteForm.patchValue({
            note: conge.note,
            critere : conge.critere

          });
    
            });
      }
    }
    
    private initForm(): void {  
      this.NoteForm = this.fb.group({
        // note: ['', Validators.required],
        note: this.ratingControl,
        critere: ['', Validators.required],

      });}

      onSubmit(): void {
        if (this.NoteForm.valid) {
          const CongeData = this.NoteForm.value; 
          if (this.isEditMode && this.NoteId !== null) {
            this.NoteService.updateNote(this.NoteId,CongeData).subscribe(() => {
              console.log('Note updated successfully');
            });
          }
          else{
            if(this.employeeId!== null){

            this.NoteService.addNote(this.employeeId,CongeData).subscribe(
              (id_note: number) => {
                console.log('Note added successfully with ID:', id_note);
                if (this.employeeId !== null) {
                this.NoteService.addPerfermance(this.employeeId).subscribe(   
                  (id_performance: number) => {
                    console.log('Performance added successfully with ID:', id_performance);
                    window.location.reload();
                  },
                  (error) => {
                    console.error('Error adding performance:', error);
                  }
                );
                }
            } ,
              (error) => {
                console.error('Error adding departement:', error);
              }
            );
            
      }
    }
    }
  }

      onCancel(): void {
        if (this.isEditMode) {
          this.router.navigate(['admin/listdepartements']);
        } else {
          this.router.navigate(['admin/listEmployees']);
        }
      }
}


