const chart = {
    title: {
        text: '都道府県の人口動態',
    },
    xAxis: {
        categories: [...Array(18)].map((_, index) => 1960 + index * 5),
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
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,
    },
    series: [
        {
            name: '',
            data: [0],
        },
    ],
    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 600,
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                    },
                },
            },
        ],
    },
}

export default chart
