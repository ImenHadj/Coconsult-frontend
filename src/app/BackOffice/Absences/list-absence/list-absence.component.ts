import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/core/models/absence.model';
import { ServiceAbsenceService } from 'src/app/core/services/service-absence.service';

@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.css']
})
export class AbsenceListComponent implements OnInit {
  absences: any[] = [];
  files: any[] = [];
  absencee: Absence[] = [];
  p: number = 1;
  itemsPerPage:number=4;
  totalProduct:any;
  startingLetter: any = '';


  constructor(private absenceService: ServiceAbsenceService) {}

  ngOnInit(): void {
    this.loadAbsences();
    this.getAbsencesForToday()
  }

  private loadAbsences(): void {
    this.absenceService.getall().subscribe((absences)=>{
      this.absences = absences as any[];
      this.totalProduct=absences.length;

    });
  }
  getAbsencesForToday(): void {
    this.absenceService.getAbsencesForToday().subscribe(
      (absences: Absence[]) => {
        this.absencee = absences;
      },
      (error) => {
        console.error('Error fetching absences:', error);
      }
    );
  }
  onInput(event: any): void {
    this.startingLetter = event.target.value;
    this.searchUsers();
  }
  searchUsers(): void {
    this.absenceService.searchUsers(this.startingLetter).subscribe(
      (data) => {
  //      console.log('Users:', data);
        this.absences = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  removeAbsence(id: number): void {
    const confirmation = confirm("Are you sure you want to delete this absence?");

    if (confirmation) {
        this.absenceService.removeAbsence(id).subscribe(() => {  
            this.absenceService.getall().subscribe((datas) => {
                this.absences = datas as any[];
            }); 
        });
    }  
  }
}
