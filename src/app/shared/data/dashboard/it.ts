import { EChartsOption } from "echarts/types/dist/echarts";

export let dataAttributes2: EChartsOption = {
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
        data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'transparent'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    series:[{
		name: 'data',
		type: 'line',
		smooth: true,
		data: [20, 20, 36, 18, 15, 20, 25, 20, 40]
	}],
    color: ['#d43f8d']
}

//Horizontal line chart
export let echartHorizontalLineChart: EChartsOption = {
    valueAxis: {
        axisLine: {
            lineStyle: {
                color: 'rgba(171, 167, 167,0.2)'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(171, 167, 167,0.2)']
            }
        },
        splitLine: {
            lineStyle: {
                color: ['rgba(171, 167, 167,0.2)']
            }
        }
    },
    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25',
    },
    xAxis: {
        data: ['2014', '2015', '2016', '2017', '2018'],
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
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
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#d43f8d'
        }
    },
    series: [{
        name: 'Total Budget',
		type: 'bar',
		data: [10, 15, 9, 18, 10, 15, 7, 14],
        color:'#0774f8'
		},
        {
            name: 'Total Amount',
            type: 'bar',
            data: [10, 14, 10, 15, 9, 25, 15, 18],
            color: '#d43f8d'
	}],
    color: ['#0774f8', '#d43f8d']
}

export let ApexData1 = {
    chart: {
        type: 'area',
        height: 100,
		width: '100%',
		lineWidth: 0.1,
		borderWidth:1,
        sparkline: {
          enabled: true
        },
    },
    stroke: {
        curve: 'smooth',
		 width: 2,
    },
    fill: {
        opacity: 0.3,
        gradient: {
          enabled: false
        }
    },
    tooltip: {
        enabled: false,
    },
    series: [{
        name: 'Work Progress %',
        data: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46,47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41]
    }],
    yaxis: {
        min: 0
    },
    colors: ['#0774f8'],
};