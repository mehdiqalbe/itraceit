import { EChartsOption } from "echarts/types/dist/echarts";
import * as Chartist from 'chartist';
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label, MultiDataSet } from "ng2-charts";

//Combined Horizontal line  and bar chart
export let ApexChartData: ChartOptions | any= {
    series: [
        {
          name: "Income",
          data: [2666, 2778, 4912, 3767, 6810, 15670, 4820, 15073, 10687, 8432],
        
        },
        {
          name: "Outcome",
          data: [2666, 2294, 1969, 19597, 1914, 4293, 3795, 5967, 4460, 5713]
        }
      ],
      colors: ['#0774f8', '#d43f8d'],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: "smooth",
      },
      markers: {
        size: 6,
        hover: {
          sizeOffset: 2
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "2011",
          "2011",
          "2011",
          "2011",
          "2012",
          "2012",
          "2012",
          "2013",
          "2013"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
}


export let dataAttributes3: EChartsOption = {
    grid: {
        top: '40',
        right: '20',
        bottom: '40',
        left: '20',
    },
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#77778e'
            }
        },
        splitLine: {
            lineStyle: {
                color: ['rgba(119, 119, 142, 0.2)']
            }
        }
    },
    valueAxis: {
        axisLine: {
            lineStyle: {
                color: '#77778e'
            }
        },
        splitArea: {
            show: false,
            areaStyle: {
                color: ['rgba(255,255,255,0.1)']
            }
        },
        splitLine: {
            lineStyle: {
                color: ['rgba(119, 119, 142, 0.2)']
            }
        }
    },
    tooltip: {
        trigger: 'axis',
        position: ['35%', '32%'],
    },
    legend: {
        data: ['New Account', 'Expansion Account']
    },
    toolbox: {
        show: false
    },
    calculable: false,
    xAxis: [{
        type: 'category',
        data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }],
    yAxis: [{
        type: 'value',
    }],
    series: [{
        name: 'View Price',
        type: 'bar',
        data: [30.0, 42.3, 60.2, 70.3, 60.8, 19.8, 27.8, 85.63, 52.63, 14.25, 63.25, 12.32],
        markPoint: {
            data: [{
                type: 'max',
                name: ''
            }, {
                type: 'min',
                name: ''
            }]
        },
        markLine: {
            data: [{
                type: 'average',
                name: ''
            }]
        }
    }, {
        name: ' Expenses',
        type: 'bar',
        data: [16.6, 40.9, 50.0, 16.4, 28.7, 80.7, 178.6, 188.2, 48.7, 18.8, 6.0, 2.3],
        markPoint: {
            data: [{
                name: 'Purchased Price',
                value: 182.2,
                xAxis: 7,
                yAxis: 183,
            }, {
                name: 'Purchased Price',
                value: 2.3,
                xAxis: 11,
                yAxis: 3
            }]
        },
        markLine: {
            data: [{
                type: 'average',
                name: ''
            }]
        }
    }],
    color: ['#0774f8', '#d43f8d']
}

// // Chart 11 Filled holes in data
export var chart11: Chart |any = {
	type: 'Line',
	data: {
		labels: [],
		series: [
			[5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
		]
	},
	options: {
		chartPadding: {
			right: 10
		},
		lineSmooth: Chartist.Interpolation.cardinal({
			fillHoles: true,
		}),
		low: 0,
		colors: ['#fff', '#fff']
	},
};


export let dataAttributes2: EChartsOption = {
    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25',
    },
    tooltip: {
        trigger: 'axis',
        position: ['35%', '32%'],
    },
    xAxis: {
        data: ['2013', '2014', '2015', '2016', '2017', '2018'],
        axisLine: {
            lineStyle: {
                color: 'rgba(171, 167, 167,0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#5f6d7a'
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(171, 167, 167,0.2)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(171, 167, 167,0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#5f6d7a'
        }
    },
    series:[{
		name: 'data',
		type: 'line',
		smooth: true,
		data: [5, 15, 9, 18, 10, 15]
	}],
    color: ['#285cf7']
}

export let  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40] },
  ];
  export let lineChartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  export let lineChartOptions: (ChartOptions & { annotation: any }) | any= {
    responsive: true,
  };
  export let lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0)',
    },
  ];
  export let lineChartLegend = true;
  export let lineChartType:any = 'line';


// Doughnut
export let doughnutChartLabels: Label[] = ['Technology', 'Furniture', 'Office Suppliers'];
export let doughnutChartData: MultiDataSet = [
  [50,25,15]
];
export let doughnutChartType: ChartType = 'doughnut';
export let doughnutChartcolor: Color[] = [
    {
        backgroundColor: ['#0774f8', '#d43f8d', '#09ad95'],
    }
];


//Area Chart
export let AreaChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    responsive: true,
    tooltips: {
        mode: 'index',
        titleFontSize: 12,
        titleFontColor: '#6b6f80',
        bodyFontColor: '#6b6f80',
        backgroundColor: '#fff',
        titleFontFamily: 'Montserrat',
        bodyFontFamily: 'Montserrat',
        cornerRadius: 3,
        intersect: false,
    },
    scales: {
        xAxes: [ {
            gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
            },
            ticks: {
                fontSize: 2,
                fontColor: 'transparent'
            }
        } ],
        yAxes: [ {
            display:false,
            ticks: {
                display: false,
            }
        } ]
    },
    title: {
        display: false,
    },
    elements: {
        line: {
            borderWidth: 1
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
        }
    }
  
  }
  export let AreaChartLabels: Label[] =['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  export let AreaChartType: ChartType = 'line';
  export let AreaChartData: ChartDataSets[] = [
    {
        label: 'Total Quantity',
		data: [30, 70, 30, 100, 50, 130, 100, 140],
    }
  ]
  
  export let AreaChartColors: Color[] = [
    {
        backgroundColor: 'transparent',
        borderColor: '#0774f8',
        pointBackgroundColor:'#0774f8',
        pointHoverBackgroundColor:'#0774f8',
        pointBorderColor :'#0774f8',
        pointHoverBorderColor :'#0774f8',
        pointBorderWidth :2,
        pointRadius :4,
        pointHoverRadius :2,
        borderWidth:3
    },
  
  ]
  

  export let AreaChartData1: ChartDataSets[] = [
    {
        label: 'Total Cost',
		data: [24, 18, 28, 21, 32, 28,30],
    }
  ]
  
  export let AreaChartColors1: Color[] = [
    {
        backgroundColor: 'transparent',
        borderColor: '#d43f8d',
        pointBackgroundColor:'#d43f8d',
        pointHoverBackgroundColor:'#d43f8d',
        pointBorderColor :'#d43f8d',
        pointHoverBorderColor :'#d43f8d',
        pointBorderWidth :2,
        pointRadius :4,
        pointHoverRadius :2,
        borderWidth: 3
    }
  
  ]
  
  export let AreaChartData2: ChartDataSets[] = [
    {
        label: 'Total Revenue',
		data: [30, 70, 30, 100, 50, 130, 100, 140],
    }
  ]
  
  export let AreaChartColors2: Color[] = [
    {
        backgroundColor: 'transparent',
        borderColor: '#09ad95',
        pointBackgroundColor:'#09ad95',
        pointHoverBackgroundColor:'#09ad95',
        pointBorderColor :'#09ad95',
        pointHoverBorderColor :'#09ad95',
        pointBorderWidth :2,
        pointRadius :4,
        pointHoverRadius :2,
        borderWidth: 3
    }
  
  ]
  
  export let AreaChartData3: ChartDataSets[] = [
    {
        label: 'Total Profit',
		data: [24, 18, 28, 21, 32, 28,30],
    }
  ]
  
  export let AreaChartColors3: Color[] = [
    {
        backgroundColor: 'transparent',
        borderColor: '#f7b731',
        pointBackgroundColor:'#f7b731',
        pointHoverBackgroundColor:'#f7b731',
        pointBorderColor :'#f7b731',
        pointHoverBorderColor :'#f7b731',
        pointBorderWidth :2,
        pointRadius :4,
        pointHoverRadius :2,
        borderWidth: 3
    }
  
  ]
  