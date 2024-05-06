import { Component, OnInit } from '@angular/core';
import { StatutC } from 'src/app/core/models/conge.model';
import { ServiceCongeService } from 'src/app/core/services/service-conge.service';
@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css'],
})
export class MyLeavesComponent implements OnInit {
  absences: any[] = [];
  startingLetter: any = '';
  p: number = 1;
  itemsPerPage: number = 4;
  totalProduct: any;
  selectedStatus: string = 'All';
  filteredAbsences: any[] = [];
  userId: number | null = null;
  nombredeJour: number | null = null;

  private getUserIdFromSession(): void {
    const userData = sessionStorage.getItem('auth-user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.id) {
        this.userId = user.id;
        console.log('aaaaaaaaaaaa' + this.userId);
      }
    }
  }
  constructor(private congeService: ServiceCongeService) {}

  ngOnInit(): void {
    this.getUserIdFromSession();

    this.loadAbsences();
  }
  private loadAbsences(): void {
    if (this.userId != null) {
      this.congeService.getConges(this.userId).subscribe((absences) => {
        this.absences = absences as any[];
        console.log(absences);
        this.filterActivitiesByState();
        this.totalProduct = absences.length;
      });
    }
  }

  removeAbsence(id: number): void {
    const confirmation = confirm(
      'Are you sure you want to delete this absence?'
    );

    if (confirmation) {
      this.congeService.removeConge(id).subscribe(() => {
        if (this.userId != null) {
          this.congeService.getConges(this.userId).subscribe((datas) => {
            this.absences = datas as any[];
            this.filterActivitiesByState();
          });
        }
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
      this.filteredAbsences = this.absences.filter(
        (activity) =>
          activity.statutC.toUpperCase() === this.selectedStatus.toUpperCase()
      );
    }
  }
}
