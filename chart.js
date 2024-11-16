// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['A', 'B', 'C', 'D', 'E'], // Метки для X-оси
//         datasets: [{
//             label: 'Пример данных',
//             data: [500000, 1000000, 1500000, 2000000, 5000000],
//             borderColor: 'green',
//             pointBackgroundColor: 'green',
//             pointRadius: 5,
//             tension: 0.4 // Сглаживание линий
//         }]
//     },
//     options: {
//         responsive: true,
//         layout: {
//             padding: {
//                 top: 10,
//                 bottom: 10,
//                 left: 10,
//                 right: 10
//             } // Общий отступ от краев холста
//         },
//         scales: {
//             y: {
//                 grid: {
//                     drawTicks: false,
//                     color: 'transparent' // Убираем линии сетки
//                 },
//                 ticks: {
//                     callback: function () {
//                         return '■'; // Символ вместо текста
//                     },
//                     padding: 0, // Убираем лишние отступы
//                     font: {
//                         size: 12, // Размер символа
//                         family: 'Arial'
//                     },
//                     color: '#000000' // Цвет меток по оси Y
//                 },
//                 border: {
//                     display: true,
//                     color: '#000000',
//                     width: 2
//                 }
//             },
//             x: {
//                 grid: {
//                     drawTicks: false,
//                     color: 'transparent' // Убираем линии сетки
//                 },
//                 ticks: {
//                     callback: function () {
//                         return '■'; // Символ вместо текста
//                     },
//                     padding: 0, // Убираем лишние отступы
//                     font: {
//                         size: 12, // Размер символа
//                         family: 'Arial'
//                     },
//                     color: '#000000' // Цвет меток по оси X
//                 },
//                 border: {
//                     display: true,
//                     color: '#000000',
//                     width: 2
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false // Отключение легенды
//             }
//         }
//     }
// });
