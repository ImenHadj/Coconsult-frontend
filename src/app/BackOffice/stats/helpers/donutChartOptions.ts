import { Options } from 'highcharts';

export function getDonutChartOptions(donutData: any[]): Options {
  return {

  chart: {
    type: 'pie',
    plotShadow: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      innerSize: '80%',
      borderWidth: 40,
      borderColor: 'transparent',
      slicedOffset: 20,
      dataLabels: {
        connectorWidth: 0,
      },
    },
  },
  title: {
    text: 'Paiment Types',
  },
  legend: {
    enabled: true,
  },
  series: [
    {
      type: 'pie',
      
      data: donutData ,
    },
  ],
}};