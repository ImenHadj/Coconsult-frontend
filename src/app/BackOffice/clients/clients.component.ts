import { Component, ViewChild ,ViewEncapsulation} from '@angular/core';
import { ServiceclientService } from '../serviceclient.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Chart from 'chart.js/auto';
import { monthlypaiment } from '../monthlypaiment.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers:[ServiceclientService],
  encapsulation : ViewEncapsulation.None,
})
export class ClientsComponent implements OnInit{
  clients: any[] = [];
  paginatedclients: any[] = [];
  numberOfClients: number = 0; 
  totalAmountLeftToPay: any;
  stocks: any[] = [];
  pageSize: number = 2;
  monthlyPayments: monthlypaiment[] = [];
  monthlypaiment?:monthlypaiment[];
  constructor(private router: Router,private clientservice:ServiceclientService){}
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  

/*getall*/
  ngOnInit(): void {
    console.log("onit.......................");
    this.clientservice.getall().subscribe((datas)=>{
      this.clients=datas as any[];
      this.onPageChange({
        pageIndex: 0, pageSize: this.pageSize,
        length: 0
      });
      this.numberOfClients = this.clients.length;
      console.log("  this.numberOfClients = "+  this.numberOfClients )
      this.calculateTotalAmountLeftToPay();
    })
    this.clientservice.paimentbymonth().subscribe((datas)=>{
      this.monthlypaiment =datas as monthlypaiment[];
      console.log("monthlypaiment"+this.monthlypaiment[0].totalPayment)
     
      this.monthlyPayments = [
        { month: 1, year: 2024, totalPayment: this.monthlypaiment[0].totalPayment },
        { month: 2, year: 2024, totalPayment: this.monthlypaiment[1].totalPayment },
        { month: 3, year: 2024, totalPayment: this.monthlypaiment[2].totalPayment },
        { month: 4, year: 2024, totalPayment: this.monthlypaiment[3].totalPayment },
        { month: 5, year: 2024, totalPayment: this.monthlypaiment[4].totalPayment },
        { month: 6, year: 2024, totalPayment: this.monthlypaiment[5].totalPayment },
        { month: 7, year: 2024, totalPayment: this.monthlypaiment[6].totalPayment },
        { month: 8, year: 2024, totalPayment: this.monthlypaiment[7].totalPayment },
        { month: 9, year: 2024, totalPayment: this.monthlypaiment[8].totalPayment },
        { month: 10, year: 2024, totalPayment: this.monthlypaiment[9].totalPayment },
        { month: 11, year: 2024, totalPayment: this.monthlypaiment[10].totalPayment },
        { month: 12, year: 2024, totalPayment: this.monthlypaiment[11].totalPayment },
        // Add more data points as needed
      ];
      this.drawGraph();
    })

  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.paginatedclients = this.clients.slice(startIndex, startIndex + event.pageSize);
}
  calculateTotalAmountLeftToPay(): void {
    this.totalAmountLeftToPay = this.clients.reduce((total, client) => total + client.amount, 0);
    console.log("totalAmountLeftToPay"+this.totalAmountLeftToPay)
  }
  isFilterApplied = false;
  /*filtre*/
  btnfiltrage() {
    if (this.isFilterApplied) {
      this.undofiltrage();
    } else {
      this.filtrage();
    }
    this.isFilterApplied = !this.isFilterApplied;
  }
  undofiltrage(): void {
    console.log("undo");
    this.clientservice.getall().subscribe((datas)=>{
      this.clients=datas as any[];
    })
  }

  filtrage():void{
    console.log("filtrage");
    this.clientservice.filtrage().subscribe((datas)=>{
      this.clients=datas as any[];
    })
  }
  see(nombre:number):void{
    console.log("duedate");
    this.clientservice.duedate(nombre).subscribe((datas)=>{
      this.clients=datas as any[];
    })
  }

  /*remove*/
  removeClient(id: number): void {
    this.clientservice.removeClient(id).subscribe(() => {  
      this.clientservice.getall().subscribe((datas) => {
        this.clients = datas as any[];
      });
    });
  }
  navigateToContracts(idClient: number): void {
    this.router.navigate(['/admin/contrat'], { queryParams: { id: idClient } });
  }

  navigateToeditclient(idClient: number): void {
    this.router.navigate(['/admin/editclient'], { queryParams: { id: idClient } });
  }
  navigateToaddContracts(idClient: number): void {
    this.router.navigate(['/admin/addcontrat'], { queryParams: { id: idClient } });
  }


  /******/
  drawGraph(): void {
    const months = this.monthlyPayments.map(payment => payment.month);

    // Calculate total payments for each month
    const totalPaymentsPerMonth = months.reduce((acc: { [month: number]: number }, month) => {
      const monthPayments = this.monthlyPayments.filter(payment => payment.month === month);
      const total = monthPayments.reduce((sum, payment) => sum + payment.totalPayment, 0);
      acc[month] = total;
      return acc;
    }, {});
    // Convertir les catégories en chaînes de caractères pour les utiliser comme libellés
    const data = Object.entries(totalPaymentsPerMonth).map(([month, total]) => total);
    const labels = months.map(month => `Month ${month}`); // Assuming month labels are numbers


    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Total Payment',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels,
              display: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

}
