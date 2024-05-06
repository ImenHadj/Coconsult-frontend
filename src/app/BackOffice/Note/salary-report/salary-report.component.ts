import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceSalaireService } from 'src/app/core/services/service-salaire.service';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
})
export class SalaryReportComponent {
  salaryStatistics: any[] | null = null;
  selectedDate: string = ''; // Holds the selected date
  noSalariesFound: boolean = false;


  constructor(private SalaireService: ServiceSalaireService) { }

  ngOnInit(): void {
    const currentDate = new Date();
    const defaultYear = currentDate.getFullYear();
    const defaultMonth = currentDate.getMonth() + 1; // Month is 0-indexed, so add 1
    this.generateMonthlySalaryReport(defaultYear, defaultMonth);
  }

  onDateChange(): void {
    if (this.selectedDate) {
      const date = new Date(this.selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      this.generateMonthlySalaryReport(year, month);
    }
  }

  generateMonthlySalaryReport(year: number, month: number): void {
    this.SalaireService.generateMonthlySalaryReport(year, month).subscribe(data => {
      if (Array.isArray(data) && data.length === 0) {
        this.noSalariesFound = true;
        this.salaryStatistics = null;

      } else {
        this.salaryStatistics = Object.values(data);
        this.noSalariesFound = false;
      }
    });
  }

  
}
