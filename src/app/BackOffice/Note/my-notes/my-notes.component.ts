// TypeScript
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceNoteService } from 'src/app/core/services/service-note.service';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {

  employeeId: number | null = null; 
  notes: any[] = [];
  usernames: { [userId: number]: string } = {}; 
  user:any;

  constructor(private fb: FormBuilder,
              private noteService: ServiceNoteService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getEmployee();
    this.loadNotes();
  }

  getUserNameById(userId: number): void {
    this.noteService.getUsernameById(userId).subscribe((user: any) => {
      this.usernames[userId] = user.username;
    });
  }
  getUserByIdEmpl(userId: number): void {
    this.noteService.getUserByIdEmpl(userId).subscribe((user: any) => {
      this.user = user;
    });
  }

  private getEmployee(): void {
    this.route.params.subscribe(params => {
      const id = params['p'];
      if (id) {
        this.employeeId = +id;
        this.getUserByIdEmpl(id);
      }
    });
  }

  private loadNotes(): void {
    if (this.employeeId !== null) {
      this.noteService.getNotesByEmp(this.employeeId).subscribe((notes) => {
        this.notes = notes as any[];
        this.notes.forEach(note => {
          if (note.idUser) {
            this.getUserNameById(note.idUser);
          }
        });
      });
    }
  }
}
