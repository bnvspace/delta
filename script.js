// Функция для динамической окраски ячеек на основе изменений
function colorizeTable(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const cells = row.getElementsByTagName("td");

        const currentValue = parseFloat(cells[1].innerText.replace(/\s+/g, '').replace(',', '.'));
        const yesterdayValue = parseFloat(cells[2].innerText.replace(/\s+/g, '').replace(',', '.'));
        const weekDayValue = parseFloat(cells[3].innerText.replace(/\s+/g, '').replace(',', '.'));

        if (isNaN(currentValue) || isNaN(yesterdayValue) || isNaN(weekDayValue)) {
            console.log("Ошибка: одно из значений не является числом.");
            return;
        }

        // Окраска для "Вчера"
        let yesterdayText = `${yesterdayValue}`;
        if (yesterdayValue < currentValue) {
            const percentChangeYesterday = ((currentValue - yesterdayValue) / yesterdayValue) * 100;
            yesterdayText += ` <span class="percent-green">+${Math.ceil(percentChangeYesterday)}%</span>`;
            cells[2].classList.add("bg-green");
        } else if (yesterdayValue > currentValue) {
            const percentChangeYesterday = ((yesterdayValue - currentValue) / currentValue) * 100;
            yesterdayText += ` <span class="percent-red">-${Math.ceil(percentChangeYesterday)}%</span>`;
            cells[2].classList.add("bg-red");
        } else {
            yesterdayText += ` <span class="percent-neutral">0%</span>`;
            cells[2].classList.remove("bg-green", "bg-red");
        }
        cells[2].innerHTML = yesterdayText;

        // Окраска для "Этот день недели"
        if (weekDayValue > currentValue) {
            cells[3].classList.add("bg-red");
            cells[3].classList.remove("bg-green");
        } else if (weekDayValue < currentValue) {
            cells[3].classList.add("bg-green");
            cells[3].classList.remove("bg-red");
        } else {
            cells[3].classList.remove("bg-green", "bg-red");
        }
    });
}

// Функция для обработки клика на строку таблицы
function onRowClick(event) {
    const cells = event.target.parentElement.getElementsByTagName("td");
    const rowData = Array.from(cells).slice(1).map(cell => parseInt(cell.innerText.replace(/\s/g, '')));
    createChart(rowData);
}

// Функция для создания графика
let myChart;
function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartLabels = ['0', '1', '2', '3', '4', '5']; // Метки для графика

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
    const initialData = [500521, 480521, 4805121]; // Пример значений для графика
    createChart(initialData);
});
