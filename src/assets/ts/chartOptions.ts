// Highchart Componentのoptionsがany型なのでanyで指定
const chartOptions: any = {
    chart: {
        scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1,
        },
        height: 450,
    },
    title: {
        text: '',
    },
    xAxis: {
        categories: [...Array(18)].map((_, index) => 1960 + index * 5),
        plotLines: [...Array(18)].map((_, index) => ({
            value: index,
            width: 1,
            color: '#888',
        })),
    },
    yAxis: {
        title: {
            text: '人口(人)',
        },
        plotLines: [
            {
                value: 0,
                width: 1,
                color: '#888',
            },
        ],
    },
    tooltip: {
        valueSuffix: '人',
    },
    legend: {
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,
    },
    series: [],
    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 900,
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                    },
                },
            },
            {
                condition: {
                    maxWidth: 600,
                },
                chartOptions: {
                    chart: {
                        height: 300,
                    },
                },
            },
        ],
    },
}

export default chartOptions
