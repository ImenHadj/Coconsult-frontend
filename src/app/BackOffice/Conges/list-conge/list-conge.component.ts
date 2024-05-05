import { Component, OnInit } from '@angular/core';
import { StatutC } from 'src/app/core/models/conge.model';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';
import { ServiceNoteService } from 'src/app/core/services/service-note.service';

@Component({
  selector: 'app-list-conge',
  templateUrl: './list-conge.component.html',
  styleUrls: ['./list-conge.component.css']
})
export class ListCongeComponent implements OnInit {
  absences: any[] = [];
  startingLetter: any = '';
  p: number = 1;
  itemsPerPage:number=4;
  totalProduct:any;
  selectedStatus:string = 'All';
  filteredAbsences: any[] = [];
  usernames: { [userId: number]: string } = {}; 
  status:StatutC[]=[];


  constructor(private congeService: ServiceCongeService,
    private noteService: ServiceNoteService

  ) {}
  getUserNameById(userId: number): void {
    this.noteService.getUsernameById(userId).subscribe((user: any) => {
      this.usernames[userId] = user.username;
    });
  }
  ngOnInit(): void {
    this.loadAbsences();  
    this.status.push(StatutC.PENDING);
    this.status.push(StatutC.REJECTED);
    this.status.push(StatutC.VALIDATED);
    }

  
  private loadAbsences(): void {
    this.congeService.getall().subscribe((absences)=>{
      this.absences=absences as any[];
      this.absences.forEach(department => {
        if (department.employee?.userId) {
          this.getUserNameById(department.employee.userId);
        }
      });

      this.filterActivitiesByState();
      this.totalProduct=absences.length;
    })
  }

  removeAbsence(id: number): void {
    const confirmation = confirm("Are you sure you want to delete this absence?");

    if (confirmation) {
        this.congeService.removeConge(id).subscribe(() => {  
            this.congeService.getall().subscribe((datas) => {
                this.absences = datas as any[];
                this.filterActivitiesByState();

            }); 
        });
    }  
}
onInput(event: any): void {
  this.startingLetter = event.target.value;
  this.searchUsers();
}
searchUsers(): void {
  this.congeService.searchUsers(this.startingLetter).subscribe(
    (data) => {
      this.absences = data;
      this.filterActivitiesByState(); 

    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}

filterActivitiesByState() {
  if (this.selectedStatus === 'All') {
    this.filteredAbsences = this.absences;
  } else {
    this.filteredAbsences = this.absences.filter(activity => activity.statutC.toUpperCase() === this.selectedStatus.toUpperCase());
  }
}



}
