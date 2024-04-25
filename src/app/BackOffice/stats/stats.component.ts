import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { getDonutChartOptions } from './helpers/donutChartOptions';
import { areaChartOptions } from './helpers/areaChartOptions';
import { barChart } from './helpers/barChart';
import { oneLineBar } from './helpers/oneLineBar';
import { paymentpercentage } from '../paimentpercentage.model';
import { ServiceclientService } from '../serviceclient.service';
import { monthlypaiment } from '../monthlypaiment.model';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent  implements OnInit{
  percentage?: paymentpercentage[] ;
  monthlypaiment?:monthlypaiment[];
  cash?: number;
  check?: number;
  card?: number;
  chart: Chart | undefined;
  areaSplineChart: Chart | undefined;
  barChart: Chart | undefined;
  oneLineBar: Chart | undefined;
  donutData: { name: string; y: number | undefined; color: string; }[] | undefined;
  bardata: { y: number; color?: string }[] = [];

  constructor(private clientservice:ServiceclientService){}
  ngOnInit(): void {
   
    this.clientservice.paimentpercentage().subscribe((datas)=>{
      this.percentage=datas as paymentpercentage[];
      
      this.cash = this.percentage[0].percentage;
      this.check = this.percentage[1].percentage;
      this.card = this.percentage[2].percentage;
      
      this.initializeCharts();
    })
    this.clientservice.paimentbymonth().subscribe((datas)=>{
      this.monthlypaiment =datas as monthlypaiment[];
      console.log("monthlypaiment"+this.monthlypaiment[0].totalPayment)
      this.bardata = [
        { y: this.monthlypaiment[0].totalPayment },
        { y: this.monthlypaiment[1].totalPayment },
        { y: this.monthlypaiment[2].totalPayment },
        { y: this.monthlypaiment[3].totalPayment },
        { y: this.monthlypaiment[4].totalPayment, color: '#ffe8df' },
        { y: this.monthlypaiment[5].totalPayment },
        { y: this.monthlypaiment[6].totalPayment },
        { y: this.monthlypaiment[7].totalPayment },
        { y: this.monthlypaiment[8].totalPayment, color: '#fc5185' },
        { y: this.monthlypaiment[9].totalPayment },
        { y: this.monthlypaiment[10].totalPayment  },
        { y: this.monthlypaiment[11].totalPayment  }
      ];
      
      this.initializeCharts();
    })
  }

  initializeCharts() {
  this.donutData = [
      { name: 'cash', y: this.cash, color: 'lightblue' },
      { name: 'check', y: this.check, color: '#393e46' },
      { name: 'credit card', y: this.card, color: '#506ef9' },
    ];


  
  this.chart = new Chart(getDonutChartOptions(this.donutData));
  this.areaSplineChart = new Chart(areaChartOptions);
  this.barChart = new Chart(barChart(this.bardata));
  this.oneLineBar = new Chart(oneLineBar);
  }


}
