import { Component, OnInit } from '@angular/core';
import { ServiceContratEmplService } from 'src/app/core/services/service-contrat-empl.service';
import { ServiceNoteService } from 'src/app/core/services/service-note.service';

@Component({
  selector: 'app-list-contrat-employee',
  templateUrl: './list-contrat-employee.component.html',
  styleUrls: ['./list-contrat-employee.component.css']
})
export class ListContratEmployeeComponent implements OnInit {
  absences: any[] = [];
  p: number = 1;
  itemsPerPage:number=4;
  totalProduct:any;
  selectedStatus:string = 'All';
  filteredAbsences: any[] = [];
  usernames: { [userId: number]: string } = {}; 



  constructor(private congeService: ServiceContratEmplService,
    private noteService: ServiceNoteService
  ) {}
  getUserNameById(userId: number): void {
    this.noteService.getUsernameById(userId).subscribe((user: any) => {
      this.usernames[userId] = user.username;
    });
  }
  ngOnInit(): void {
    this.loadAbsences();  
  }

  private loadAbsences(): void {
    this.congeService.getall().subscribe((absences)=>{
      this.absences=absences as any[];
      this.absences.forEach(department => {
        if (department.empl?.userId) {
          this.getUserNameById(department.empl.userId);
        }
      });
      this.filterActivitiesByState();

        this.totalProduct=absences.length;

    })
  }

  removeAbsence(id: number): void {
    const confirmation = confirm("Are you sure you want to delete this Contrat?");

    if (confirmation) {
        this.congeService.deleteContratEmployee(id).subscribe(() => {  
            this.congeService.getall().subscribe((datas) => {
                this.absences = datas as any[];
            }); 
        });
    }  
}

filterActivitiesByState() {
  if (this.selectedStatus === 'All') {
    this.filteredAbsences = this.absences;
  } else {
    this.filteredAbsences = this.absences.filter(activity => activity.typeCE.toUpperCase() === this.selectedStatus.toUpperCase());
  }
}
}
