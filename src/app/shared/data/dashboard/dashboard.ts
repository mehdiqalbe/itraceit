import * as echarts from 'echarts';
import { ChartDataSets,  ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexYAxis,
    ApexLegend,
    ApexFill
  } from "ng-apexcharts";

  export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    colors: string[];
    legend: ApexLegend;
    fill: ApexFill;
  };
export let ApexData1 = {
    chart: {
        type: 'area',
        height: 50,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.2,
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    fill: {
        gradient: {
            enabled: false
        }
    },
    tooltip: {
        enabled: false,
    },
    series: [{
        name: 'Production Volume',
        data: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]
    }],
    yaxis: {
        min: 0
    },
    colors: ['#0774f8'],
};

export let ApexData2 = {
    chart: {
        type: 'area',
        height: 50,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.2,
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    fill: {
        gradient: {
            enabled: false
        }
    },
    tooltip: {
        enabled: false,
    },
    series: [{
        name: 'Sales Revenue',
        data: [24, 65, 31, 37, 39, 62, 51, 35, 47, 45, 54, 38, 56, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]
    }],
    yaxis: {
        min: 0
    },
    colors: ['#d43f8d'],
}

export let ApexData3 = {
    chart: {
        type: 'area',
        height: 50,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.2,
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    fill: {
        gradient: {
            enabled: false
        }
    },
    tooltip: {
        enabled: false,
    },
    series: [{
        name: 'Total Orders',
        data: [27, 93, 53, 61, 27, 54, 43, 19, 46, 47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35]
    }],
    yaxis: {
        min: 0
    },
    colors: ['#09ad95'],
}

export let ApexData4 = {
    chart: {
        type: 'area',
        height: 50,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.2,
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    fill: {
        gradient: {
            enabled: false
        }
    },
    tooltip: {
        enabled: false,
    },
    series: [{
        name: 'Total Profile',
        data: [39, 62, 51, 35, 41, 35, 27, 93,47, 45, 54, 38, 56, 24, 65, 31, 37, 53, 61, 27, 54, 43, 19, 46]
    }],
    yaxis: {
        min: 0
    },
    colors: ['#f82649'],
}


export let ApexSparklines1 = {
    series: [{
        data: [2, 4, 3, 4, 5, 4, 5, 0]
    }],
    colors: ['#d43f8d'],
    chart: {
        type: 'bar',
        widht: 150,
        height: 78,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '25%',
        }
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName:any) {
                    return "";
                }
            }
        },
        marker: {
            show: true
        }
    }
}
//Crypto Charts
export let lineChartOptions: ChartOptions | any = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    responsive: true,
    tooltips: {
        mode: 'index',
        titleFontSize: 12,
        titleFontColor: '#000',
        bodyFontColor: '#000',
        backgroundColor: '#fff',
        titleFontFamily: 'Montserrat',
        bodyFontFamily: 'Montserrat',
        cornerRadius: 0,
        intersect: false,
    },
    scales: {
        xAxes: [{
            gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
            },
            ticks: {
                fontSize: 2,
                fontColor: 'transparent'
            }
        }],
        yAxes: [{
            display: false,
            ticks: {
                display: false,
            }
        }]
    },
    title: {
        display: false,
    },
    elements: {
        line: {
            borderWidth: 2
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4
        }
    }
}

export let lineChartLabels: Label[] =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
export let lineChartType: ChartType = 'line';
export let lineChartLegend = true;
export let lineChartColors: Color[] = [
    {
        backgroundColor: 'rgba(7, 116, 248,0.6)',
        borderColor: '#0774f8',
        // borderWidth: 3,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent'
    }
]
export let lineChartData: ChartDataSets[] = [
    {
        data:  [24, 30, 20, 28, 39, 22, 40],
        label: '',
    }
]
export let lineChartColors1: Color[] = [
    {
        backgroundColor: 'rgba(212, 63, 141,0.6)',
        borderColor: '#d43f8d',
        // borderWidth: 3,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent'
    }
]
export let lineChartData1: ChartDataSets[] = [
    {
        data: [24, 30, 20, 28, 39, 22, 40],
        label: '',
    }
]
export let lineChartColors2: Color[] = [
    {
        backgroundColor: 'rgba(19, 191, 166, 0.6)',
        borderColor: '#09ad95',
        // borderWidth: 3,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent'
    }
]
export let lineChartData2: ChartDataSets[] = [
    {
        data: [24, 30, 20, 28, 39, 22, 40],
        label: '',
    }
]