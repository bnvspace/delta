// Пример данных для графиков
const chartData = {
    revenue: [500521, 690521, 800521, 750521, 690521, 900521],
    cash: [500521, 690521, 800521, 750521, 690521, 900521],
    nonCash: [500521, 690521, 800521, 750521, 690521, 900521]
};

// Инициализация графика при загрузке страницы
let chart = Highcharts.chart('chart-container', {
    title: {
        text: 'График данных'
    },
    yAxis: {
        title: {
            text: 'Значение'
        }
    },
    xAxis: {
        categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    },
    series: [{
        name: 'Значение',
        data: chartData.revenue // Начальные данные для графика (например, revenue)
    }],
    chart: {
        type: 'line'
    }
});

// Функция для обновления данных на графике при клике на строку
function showChart(type) {
    chart.series[0].setData(chartData[type], true); // Обновление данных для выбранного типа
    chart.setTitle({ text: `График для ${type}` }); // Изменение заголовка графика
}
