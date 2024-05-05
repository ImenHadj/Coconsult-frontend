import { Component, OnInit } from '@angular/core';
import { SericeEmployeeService } from 'src/app/core/services/serice-employee.service';
import * as XLSX from'xlsx';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: any[] = [];
  starsArray: any[] = [];
  emptyStarsArray: any[] = [];
  availablePercentage:number=0;
  max:number=0;
  errorMessage: string = '';
    startingLetter: any = '';
    p: number = 1;
  itemsPerPage:number=4;
  totalProduct:any;
  fileName="ExcelSheet.xlsx";




  constructor(private employeeService: SericeEmployeeService) {}

  ngOnInit(): void {
    this.loadAbsences();
    this.fetchAnalytics();
    this.fetchmax();
  }
  onInput(event: any): void {
    this.startingLetter = event.target.value;
    this.searchUsers();
  }
  searchUsers(): void {
    this.employeeService.searchUsers(this.startingLetter).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  exportExcel(): void {
    // Attendez un court délai pour vous assurer que le contenu est bien rendu
    setTimeout(() => {
      // Sélectionnez l'élément à exporter
      let element = document.getElementById('exportContent');
      if (element) {
        // Générez le fichier Excel
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, this.fileName);
      } else {
        console.error("Element 'exportContent' not found or empty.");
      }
    }, 100); // Attendre 100 millisecondes avant d'exporter
  }

  private loadAbsences(): void {
    this.employeeService.getall().subscribe((absences)=>{
      this.employees=absences as any[];
      this.totalProduct=absences.length;

      // console.log(this.max)
    })
  }


  removeEmployee(id: number): void {
    const confirmation = confirm("Are you sure you want to delete this absence?");

    if (confirmation) {
        this.employeeService.removeEmployee(id).subscribe(() => {  
            this.employeeService.getall().subscribe((datas) => {
                this.employees = datas as any[];
            }); 
        });
    }
}
fetchAnalytics() {
  this.employeeService.moyennedeperf().subscribe(
    (availablePercentage) => this.availablePercentage = availablePercentage as number,
    (errorResponse) => {
      if (errorResponse.error && errorResponse.error.error) {
        this.errorMessage = errorResponse.error.error;
      } else {
        this.errorMessage = 'An unexpected error occurred.';
      }
    }
  );
}
fetchmax() {
  this.employeeService.calculateNbreEmpl().subscribe(
    (max) => this.max = max as number,
    (errorResponse) => {
      if (errorResponse.error && errorResponse.error.error) {
        this.errorMessage = errorResponse.error.error;
      } else {
        this.errorMessage = 'An unexpected error occurred.';
      }
    }
  );
}
}
