import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { EChartsOption } from "echarts/types/dist/echarts";
import { Color, Label } from "ng2-charts";

export let echartLineOption: EChartsOption = {
    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25',
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer: {
            label: {
                show: false,
            }
        }
    },
    xAxis: {
        data: ['2014', '2015', '2016', '2017', '2018'],
        axisLine: {
            lineStyle: {
                color: 'rgba(67, 87, 133, .09)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#8e9cad'
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(67, 87, 133, .09)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(67, 87, 133, .09)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#8e9cad'
        }
    },
    series: [
        {
            name: 'sales',
            type: 'line',
            smooth: true,
            data: [12, 25, 12, 35, 12],
        },
        {
            name: 'Profit',
            type: 'line',
            smooth: true,
            data: [8, 12, 28, 10, 10],
        }
    ],
    color: ['#705ec8', '#fb1c52']
}
export let echartLineOption1: EChartsOption = {
    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25',
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer: {
            label: {
                show: false,
            }
        }
    },
    xAxis: {
        data: ['2014', '2015', '2016', '2017', '2018'],
        axisLine: {
            lineStyle: {
                color: 'rgba(67, 87, 133, .09)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#8e9cad'
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(67, 87, 133, .09)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(67, 87, 133, .09)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#8e9cad'
        }
    },
    series: [
        {
            name: 'sales',
            type: 'line',
            smooth: true,
            data: [12, 25, 12, 35, 12],
        },
        {
            name: 'Profit',
            type: 'line',
            smooth: true,
            data: [8, 12, 28, 10, 10],
        }
    ],
    color: ['#705ec8', '#fb1c52']
}

//BarChart
export let barChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
        mode: 'index',
        titleFontSize: 12,
        titleFontColor: '#000',
        bodyFontColor: '#000',
        backgroundColor: '#fff',
        cornerRadius:3,
        intersect: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontSize: 10,
          fontColor: 'transparent'
        },
        display: true,
        gridLines:{
            display: false,
            drawBorder: false
        },
        scaleLabel:{
            display: false,
            labelString: 'sales',
            fontColor: 'transparent'
        }
      }],
      xAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          fontSize: 11,
          fontColor:'#77778e'
        },
        gridLines:{
            display: false,
            drawBorder: false 
        },
        scaleLabel:{
            display: false,
            labelString: 'Month',
            fontColor: '#77778e'
        }
      }],
      
    }
  };
  export let barChartLabels: Label[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun" ,"Aug", "Sep"];
  export let barChartType: ChartType = 'bar';
  export let barChartLegend = true;
  export let barChartPlugins = [];
  export let barChartData: ChartDataSets[] = [
    {
      data: [16, 14, 12, 14, 16, 15, 12, 14, 18, 10],
      label: 'Current Deals',
      barPercentage: 0.3,
      backgroundColor: '#09ad95',
      hoverBackgroundColor: "#089ad95",
      hoverBorderColor: '#089ad95',
      hoverBorderWidth: 2
    }
  ];
  export let barChartColors: Color[] = [
    {
      backgroundColor: '#09ad95'
    }
  ]
  
  
  
export let StatusData:any = {

    series: [{
        name: 'Page Views',
        type: 'bar',
        barMaxWidth: 7,
        data: [1453, 3425, 7654, 3245, 4532, 5643, 7635, 5465, 6754, 5432, 5435, 6545],
        itemStyle: {
              normal: {
                  barBorderRadius: [50, 50, 0, 0] ,
              }
        }
    }, {
        name: 'New Visitors',
		  type: 'bar',
		  barMaxWidth: 7,
		  data: [1123, 2435, 5463, 1245, 3245, 4534, 5435, 3452, 5432, 3452, 2564, 3456 ],
		  itemStyle: {
                normal: {
                    barBorderRadius: [50, 50, 0, 0] ,
				}
		  }
    }],

    colors: ['#4454c3', '#f72d66','#cedbfd'],

    chart: {
        height: 285,
        type: 'bar',
        toolbar: {
            show: true,
			showContent: true,
			alwaysShowContent: true,
			triggerOn: 'mousemove',
			trigger: 'axis',
			axisPointer:
			{
				label: {
					show: true,
				}
			}
        },
        fontFamily: 'Nunito, sans-serif',
    },

    plotOptions: {
        bar: {
            dataLabels: {
                enabled: false
            },
            columnWidth: '42%',
            endingShape: 'rounded',
        }
    },

    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 1,
        endingShape: 'rounded',
        colors: ['transparent'],
    },
    responsive: [{
        breakpoint: 576,
        options: {
            stroke: {
                show: true,
                width: 1,
                endingShape: 'rounded',
                colors: ['transparent'],
            },
        },


    }],

    xaxis: {
        categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLine: {
			lineStyle: {
			  color: 'rgba(67, 87, 133, .09)'
			}
		  },
		  axisLabel: {
			fontSize: 10,
			color: '#8e9cad'
		  }
    },
    yaxis:{
        splitLine: {
        lineStyle: {
          color: 'rgba(67, 87, 133, .09)'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(67, 87, 133, .09)'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#8e9cad'
      }},
    fill: {
        opacity: 1
    },
    legend: {
        show: false,
        floating: true,
        position: 'top',
        horizontalAlign: 'left',


    },

    tooltip: {
        y: {
            formatter: function (val:any) {
                return "$ " + val + " thousands"
            }
        }
    }
};


export let barChartOptions1: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    tooltips: {
        mode: 'index',
        titleFontSize: 12,
        titleFontColor: '#000',
        bodyFontColor: '#000',
        backgroundColor: '#fff',
        cornerRadius: 3,
        intersect: false,
    },
    legend: {
        display: false,
        labels: {
            usePointStyle: true,
            fontFamily: 'Montserrat',
        },
    },
    scales: {
        
        xAxes: [{
            ticks: {
                fontColor: "#77778e",

             },
            display: true,
            gridLines: {
                display: true,
                color: 'rgba(119, 119, 142, 0.2)',
                drawBorder: false
            },
            scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'rgba(0,0,0,0.8)'
            }
        }],
        yAxes: [{
            ticks: {
                fontColor: "#77778e",
             },
            display: true,
            gridLines: {
                display: true,
                color: 'rgba(119, 119, 142, 0.2)',
                drawBorder: false
            },
            scaleLabel: {
                display: false,
                labelString: 'sales',
                fontColor: 'rgba(0,0,0,0.81)'
            }
        }]
    },
};
export let barChartLabels1: Label[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
export let barChartType1: ChartType = 'bar';
export let barChartLegend1 = true;

export let barChartData1: ChartDataSets[] = [
    { label: 'total profit',
        data: [15, 18, 12, 14, 10, 15, 7, 14],
        backgroundColor:'#d43f8d',
        hoverBackgroundColor: '#d43f8d',
        hoverBorderWidth: 2,
        hoverBorderColor: '#d43f8d',
        barPercentage:0.5
     },
    {  label: 'Total sales',
        data: [10, 14, 10, 15, 9, 14, 15, 20],
        backgroundColor: '#0774f8',
        hoverBackgroundColor:'#0774f8',
        hoverBorderWidth: 2,
        hoverBorderColor: '#0774f8',
        barPercentage:0.5
     },
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
        label: 'Market value',
        data: [30, 70, 30, 100, 50, 130, 100, 140],
    }
  ]
  
  export let AreaChartColors: Color[] = [
    {
        backgroundColor: 'transparent',
        borderColor: '#d43f8d',
        pointBackgroundColor:'#fff',
        pointHoverBackgroundColor:'#d43f8d',
        pointBorderColor :'#d43f8d',
        pointHoverBorderColor :'#d43f8d',
        pointBorderWidth :2,
        pointRadius :2,
        pointHoverRadius :2,
        borderWidth: 4
    },
  
  ]
  

  export let AreaChartData1: ChartDataSets[] = [
    {
        label: 'Total Revenue',
        data: [24, 18, 28, 21, 32, 28,30],
    }
  ]
  
  export let AreaChartColors1: Color[] = [
    {
        backgroundColor: 'transparent',
        borderColor: '#09ad95',
        pointBackgroundColor:'#fff',
        pointHoverBackgroundColor:'#09ad95',
        pointBorderColor :'#09ad95',
        pointHoverBorderColor :'#09ad95',
        pointBorderWidth :2,
        pointRadius :2,
        pointHoverRadius :2,
        borderWidth: 4
    }
  
  ]
  