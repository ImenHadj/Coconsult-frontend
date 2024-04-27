import { Options } from 'highcharts';

export function barChart(bardata: any[]): Options{
  return {
  chart: {
    type: 'bar',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: 'Total Paiments Monthly',
  },
  yAxis: {
    visible: false,
    gridLineColor: '#fff',
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    lineColor: '#fff',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },

  plotOptions: {
    series: {
      borderRadius: 5,
    } as any,
  },

  series: [
    {
      type: 'bar',
      color: '#506ef9',
      data: bardata
    },
  ],

}};