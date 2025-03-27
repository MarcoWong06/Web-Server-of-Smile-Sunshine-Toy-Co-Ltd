(function () {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

    // Graphs
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                data: [3006, 4510, 4522, 4523, 4909, 4915, 0],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    })

    document.addEventListener('DOMContentLoaded', function () {
        const dropdownItems = document.querySelectorAll('.dropdown-item[data-range]');
        const dropdownButton = document.getElementById('dateRangeDropdown');

        const chartData = {
            week: {
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                data: [3006, 4510, 4522, 4523, 4909, 4915, 0]
            },
            month: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                data: [12000, 15000, 13000, 14000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000]
            },
            quarter: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [45000, 47000, 49000, 51000]
            },
            year: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                data: [200000, 210000, 220000, 230000, 240000, 250000]
            }
        };

        dropdownItems.forEach(item => {
            item.addEventListener('click', function () {
                const range = this.getAttribute('data-range');
                dropdownButton.innerHTML = `<span data-feather="calendar"></span> ${this.textContent.trim()}`;
                feather.replace();

                // Update chart labels and data
                myChart.data.labels = chartData[range].labels;
                myChart.data.datasets[0].data = chartData[range].data;
                myChart.update();
            });
        });
    });
})()