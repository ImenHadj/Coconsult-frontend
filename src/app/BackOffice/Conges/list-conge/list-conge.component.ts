import { Component, OnInit } from '@angular/core';
import { StatutC } from 'src/app/core/models/conge.model';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';

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
  selectedStatus: StatutC = StatutC.PENDING; // Initialize selectedStatus with a default value
  statusList = Object.values(StatutC).filter(value => typeof value === 'string').sort();




  constructor(private congeService: ServiceCongeService) {}

  ngOnInit(): void {
    this.loadAbsences();  
  }

  filterByStatus(status: StatutC): void {
    this.selectedStatus = status;
    this.searchUsers();
  }
  
  private loadAbsences(): void {
    this.congeService.getall().subscribe((absences)=>{
      this.absences=absences as any[];
      this.totalProduct=absences.length;
    })
  }

  removeAbsence(id: number): void {
    const confirmation = confirm("Are you sure you want to delete this absence?");

    if (confirmation) {
        this.congeService.removeConge(id).subscribe(() => {  
            this.congeService.getall().subscribe((datas) => {
                this.absences = datas as any[];
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
//      console.log('Users:', data);
      this.absences = data;
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}

}
