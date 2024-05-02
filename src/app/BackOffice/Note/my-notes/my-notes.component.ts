import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { critereNote } from 'src/app/core/models/note.model';
import { ServiceNoteService } from 'src/app/core/services/service-note.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit{

  employeeId: number | null = null; 
  notes: any[] = [];
  name:any;


  constructor(private fb: FormBuilder,
    private NoteService: ServiceNoteService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

    getUserNameById(userId: number): any {
      return this.NoteService.getUsernameById(userId).pipe(
        map(response => response.body) // Extract the body of the response
      );
    }


    ngOnInit(): void {
 
      this.getEmployee();
      this.loadDepartements();

      
    }

    private getEmployee():void{
      this.route.params.subscribe(params => {
        const id = params['p'];
        if (id) {
          this.employeeId = +id;
        }
      });
    }

    private loadDepartements(): void {
      if(this.employeeId!=null)
      this.NoteService.getNotesByEmp(this.employeeId).subscribe((absences)=>{
        this.notes=absences as any[];

  
      })
    }
  }
  

