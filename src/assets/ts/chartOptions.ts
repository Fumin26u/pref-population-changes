const chartOptions = {
    type: 'line',
    datasets: [],
    options: {
        title: {
            display: true,
            text: '各都道府県の年別人口動態',
        },
        plugins: {
            scheme: 'brewer.Paired12',
        },
    },
}

export default chartOptions
