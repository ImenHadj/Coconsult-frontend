import { ServiceDepartementService } from 'src/app/core/services/service-departement.service';
import { Departement } from './../../../core/models/departement.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent implements OnInit {
  departements: any[] = [];
  startingLetter: any = '';
  users: any[] = [];
  availablePercentage:number=0;
  max:number=0;
  p: number = 1;
  itemsPerPage:number=4;
  totalProduct:any;


  onInput(event: any): void {
    this.startingLetter = event.target.value;
    this.searchUsers();
  }

  constructor(private absenceDepartement: ServiceDepartementService) {}
  ngOnInit(): void {
    this.loadDepartements();
    this.fetchAnalytics();  
    this.fetchmax();
  }

  private loadDepartements(): void {
    this.absenceDepartement.getall().subscribe((absences)=>{
      this.departements=absences as any[];
      this.totalProduct=absences.length;

    })
  }

  removeAbsence(id: number): void {
    const confirmation = confirm("Are you sure you want to delete this absence?");

    if (confirmation) {
        this.absenceDepartement.removeDepartement(id).subscribe(() => {  
            this.absenceDepartement.getall().subscribe((datas) => {
                this.departements = datas as any[];
            }); 
        });
    }
}

fetchAnalytics() {
  this.absenceDepartement.fetchAnalytics().subscribe(
    (availablePercentage) => this.availablePercentage = availablePercentage as number,
    error => console.error('Error fetching available percentage:', error)
  );
}
fetchmax() {
  this.absenceDepartement.fetchMax().subscribe(
    (max) => this.max = max as number,
    error => console.error('Error fetching max:', error)
  );
}

searchUsers(): void {
  this.absenceDepartement.searchUsers(this.startingLetter).subscribe(
    (data) => {
      this.departements = data;
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}
}
