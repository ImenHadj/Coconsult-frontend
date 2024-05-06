import { Component, OnInit } from '@angular/core';
import { ServiceAbsenceService } from 'src/app/core/services/service-absence.service';
import { ServiceNoteService } from 'src/app/core/services/service-note.service';
import { Absence } from 'src/app/core/models/absence.model';

@Component({
  selector: 'app-my-absences',
  templateUrl: './my-absences.component.html',
  styleUrls: ['./my-absences.component.css'],
})
export class MyAbsencesComponent {
  absences: any[] = [];
  files: any[] = [];
  absencee: Absence[] = [];
  p: number = 1;
  itemsPerPage: number = 4;
  totalProduct: any;
  startingLetter: any = '';
  userId: number | null = null;
  usernames: { [userId: number]: string } = {};

  constructor(private absenceService: ServiceAbsenceService) {}

  private getUserIdFromSession(): void {
    const userData = sessionStorage.getItem('auth-user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.id) {
        this.userId = user.id;
        console.log('ID user :' + this.userId);
      }
    }
  }

  ngOnInit(): void {
    this.getUserIdFromSession();
    this.loadAbsences();

  }

  private loadAbsences(): void {
    if (this.userId != null) {
      this.absenceService
        .getAbsencesByUserId(this.userId)
        .subscribe((absences) => {
          this.absences = absences as any[];
          this.totalProduct = absences.length;
        });
    }
  }

  onInput(event: any): void {
    this.startingLetter = event.target.value;
    this.searchUsers();
  }
  searchUsers(): void {
    this.absenceService.searchUsers(this.startingLetter).subscribe(
      (data) => {
        this.absences = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
