// Функция для динамической окраски ячеек на основе изменений
function colorizeTable(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const cells = row.getElementsByTagName("td");

        // Получаем значения с учётом пробелов и запятых
        const currentValueText = cells[1].innerText;
        const yesterdayValueText = cells[2].innerText;
        const weekDayValueText = cells[3].innerText;

        // Чистим пробелы для вычислений и заменяем запятую на точку
        const currentValue = parseFloat(currentValueText.replace(/\s+/g, '').replace(',', '.'));
        const yesterdayValue = parseFloat(yesterdayValueText.replace(/\s+/g, '').replace(',', '.'));
        const weekDayValue = parseFloat(weekDayValueText.replace(/\s+/g, '').replace(',', '.'));

        if (isNaN(currentValue) || isNaN(yesterdayValue) || isNaN(weekDayValue)) {
            console.log("Ошибка: одно из значений не является числом.");
            return;
        }

        // Окраска для "Вчера"
        let yesterdayText = yesterdayValueText.replace(/\B(?=(\d{3})+(?!\d))/g, " ");  // Пробелы между тысячами
        let percentChangeYesterday = "";
        
        if (yesterdayValue < currentValue) {
            percentChangeYesterday = ` <span class="percent-green">+${Math.ceil(((currentValue - yesterdayValue) / yesterdayValue) * 100)}%</span>`;
            cells[2].classList.add("bg-green");
        } else if (yesterdayValue > currentValue) {
            percentChangeYesterday = ` <span class="percent-red">-${Math.ceil(((yesterdayValue - currentValue) / currentValue) * 100)}%</span>`;
            cells[2].classList.add("bg-red");
        } else {
            percentChangeYesterday = ` <span class="percent-neutral">0%</span>`;
            cells[2].classList.remove("bg-green", "bg-red");
        }

        // Разделение чисел и процентов на разные классы
        const numberText = `<span class="number">${yesterdayText}</span>`;
        const percentageText = `<span class="percent">${percentChangeYesterday}</span>`;
        cells[2].innerHTML = numberText + percentageText;

        // Окраска для "Этот день недели"
        const weekDayCell = cells[3];
        if (weekDayValue > currentValue) {
            weekDayCell.classList.add("bg-red");
            weekDayCell.classList.remove("bg-green");
        } else if (weekDayValue < currentValue) {
            weekDayCell.classList.add("bg-green");
            weekDayCell.classList.remove("bg-red");
        } else {
            weekDayCell.classList.remove("bg-green", "bg-red");
        }
    });
}


// Функция для обработки клика на строку таблицы
function onRowClick(event) {
    const cells = event.target.parentElement.getElementsByTagName("td");
    // Преобразуем все значения в строках в массив чисел, игнорируя первый столбец
    const rowData = Array.from(cells).slice(1).map(cell => parseFloat(cell.innerText.replace(/\s/g, '').replace(',', '.')));
    createChart(rowData); // Передаем весь ряд данных
}

// Функция для создания графика
let myChart;
function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartLabels = ['0', '1', '2', '3', '4', '5', '6']; // Метки для графика

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Выручка, руб',
                data: data,
                borderColor: 'green',
                backgroundColor: '#268f68',
                borderWidth: 2,
                pointBackgroundColor: '#268f68',
                pointBorderColor: '#268f68',
                pointRadius: 5,
                tension: 0 // Сглаживание линий
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            },
            scales: {
                y: {
                    grid: {
                        drawTicks: false,
                        color: 'transparent' // Убираем линии сетки
                    },
                    ticks: {
                        callback: function () {
                            return '■'; // Символ вместо текста
                        },
                        padding: 0,
                        font: {
                            size: 12,
                            family: 'Arial'
                        },
                        color: '#000000'
                    },
                    border: {
                        display: true,
                        color: '#000000',
                        width: 2
                    }
                },
                x: {
                    grid: {
                        drawTicks: false,
                        color: 'transparent' // Убираем линии сетки
                    },
                    ticks: {
                        callback: function () {
                            return '■'; // Символ вместо текста
                        },
                        padding: -3,
                        font: {
                            size: 12,
                            family: 'Arial'
                        },
                        color: '#000000'
                    },
                    border: {
                        display: true,
                        color: '#000000',
                        width: 2
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Вызов функций после загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    // Вызов цветовых функций для каждой таблицы
    colorizeTable("data-table");
    colorizeTable("data-table-2");

    // Добавление обработчика клика на строки обеих таблиц
    const rows1 = document.querySelectorAll("#data-table tbody tr");
    rows1.forEach(row => {
        row.addEventListener("click", onRowClick);
    });

    const rows2 = document.querySelectorAll("#data-table-2 tbody tr");
    rows2.forEach(row => {
        row.addEventListener("click", onRowClick);
    });

    // Изначальный график
    const initialData = [0, 2800521, 3980521, 4800521, 3805121, 3580521, 4805121]; // Пример значений для графика
    createChart(initialData);
});
